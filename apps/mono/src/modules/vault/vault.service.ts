import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import Vault, {client} from 'node-vault';
import fs from 'fs';

@Injectable()
export class VaultService implements OnModuleInit {
  private logger = new Logger(VaultService.name);
  private vault: client;
  private config = {};

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.logger.log(`Vault Initializing...`);

    try {
      await this.init();
      this.logger.log(`Vault initialize successfully: ${Object.keys(this.config)}`);
    } catch (e) {
      this.logger.error('Vault init failed.');
      this.logger.error(e.toString());
    }
  }

  private async init() {
    const endpoint = process.env.VAULT_ADDR;
    const token = process.env.VAULT_TOKEN;
    const tokenFile = process.env.KUBE_SA_TOKEN_FILE;

    this.vault = Vault({
      endpoint,
      token,
    });

    // local environment has token
    if (!token && tokenFile) {
      this.logger.log('Connecting to Vault...');
      await this.vault.kubernetesLogin({
        mount_point: process.env.VAULT_KUBE_AUTH_PATH,
        role: process.env.VAULT_KUBE_AUTH_ROLE,
        jwt: fs.readFileSync(tokenFile, 'utf-8'),
      });
      this.logger.log('Vault connected...');
    }

    this.logger.log('Getting Vault values...');

    return Promise.all([
      this.getVault('/spring'),
      this.getVault('/node'),
      this.getVault('/mongodb'),
      this.getVault('/azure'),
    ]);
  }

  private async getVault(key: string) {
    const vaultSecretEngine = process.env.VAULT_SECRET_ENGINE;
    const vaultSecretDataPath = process.env.VAULT_SECRET_DATA_PATH;
    const vaultKey = `${vaultSecretEngine}/data/${vaultSecretDataPath}${key}`;

    this.logger.log(`Getting vault: ${vaultKey}`);

    const result = await this.vault.read(vaultKey);
    this.config = {
      ...this.config,
      ...(result?.data?.data || {}),
    };
  }

  public getAll() {
    return this.config;
  }

  public get(key) {
    return this.config[key] || null;
  }
}

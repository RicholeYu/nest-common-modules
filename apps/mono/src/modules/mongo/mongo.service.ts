import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import fs from 'fs';
import {MongoClient} from 'mongodb';
import {ClientEncryption} from 'mongodb-client-encryption';
import {VaultService} from '../vault/vault.service';

@Injectable()
export class MongoService implements OnModuleInit {
  logger = new Logger(MongoService.name);
  private mongodbUrl: string;
  private mongodbKeyDb: string;
  private mongodbKeyCollection: string;
  private mongodbMasterKey;
  private schemaMap = {};
  private clientEncryption: ClientEncryption;
  private isEncript: boolean;

  async onModuleInit() {
    this.logger.log(`Mongo Initializing...`);

    try {
      await this.init();
      this.logger.log(`Mongo initialize successfully`);
    } catch (e) {
      this.logger.error('Mongo init failed.');
      this.logger.error(e.toString());
    }
  }

  constructor(private readonly configService: ConfigService, private readonly vaultService: VaultService) {}

  async init() {
    this.mongodbUrl = this.vaultService.get('lead-mongodb-url') || process.env.MONGODB_URL;
    this.mongodbKeyDb = process.env.MONGODB_KEY_DB;
    this.mongodbKeyCollection = process.env.MONGODB_KEY_COLLECTION;
    this.mongodbMasterKey = Buffer.from(
      this.vaultService.get('mongodb-master-key') || process.env.MONGODB_MASTER_KEY,
      'base64',
    );

    this.isEncript = fs.existsSync(process.env.MONGODB_SCHEMA_MAP_PATH);

    this.logger.log(`Connecting to mongodb(unencrypted client)...`);
    const unencryptedClient = await new MongoClient(this.mongodbUrl).connect();
    const databaseName = unencryptedClient.db().databaseName;
    this.logger.log(`Unencrypted client connected...`);

    if (this.isEncript) {
      this.schemaMap = JSON.parse(fs.readFileSync(process.env.MONGODB_SCHEMA_MAP_PATH, 'utf8'));
      this.logger.log(`Encrypting...`);

      const encryption = new ClientEncryption(unencryptedClient, {
        keyVaultNamespace: this.getKeyVaultNamespace(),
        kmsProviders: {
          local: {
            key: this.mongodbMasterKey,
          },
        },
      });

      this.logger.log(`Encrypted...`);
      this.clientEncryption = encryption;

      const collection = unencryptedClient.db(this.mongodbKeyDb).collection(this.mongodbKeyCollection);

      this.logger.log(`Checking data key...`);

      let keyId;

      const dataKey = await collection.findOne({keyAltNames: [databaseName]});
      if (!dataKey) {
        this.logger.log(`Data key not found, creating...`);
        keyId = await encryption.createDataKey('local', {
          keyAltNames: [databaseName],
        });
      } else {
        keyId = dataKey._id;
      }

      this.logger.log(`Data key ready, setting schema map...`);
      Object.keys(this.schemaMap).forEach((collectionName) => {
        this.schemaMap[collectionName].encryptMetadata.keyId = [keyId];
        this.schemaMap[`${databaseName}.${collectionName}`] = this.schemaMap[collectionName];
        delete this.schemaMap[collectionName];
      });
    }

    this.logger.log(`Mongo util initialed: ${databaseName}`);
  }

  private getKeyVaultNamespace() {
    return `${this.mongodbKeyDb}.${this.mongodbKeyCollection}`;
  }
}

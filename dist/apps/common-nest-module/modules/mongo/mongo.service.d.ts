import { Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VaultService } from '../vault/vault.service';
export declare class MongoService implements OnModuleInit {
    private readonly configService;
    private readonly vaultService;
    logger: Logger;
    private mongodbUrl;
    private mongodbKeyDb;
    private mongodbKeyCollection;
    private mongodbMasterKey;
    private schemaMap;
    private clientEncryption;
    private isEncript;
    onModuleInit(): Promise<void>;
    constructor(configService: ConfigService, vaultService: VaultService);
    init(): Promise<void>;
    private getKeyVaultNamespace;
}

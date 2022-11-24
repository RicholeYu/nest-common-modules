import { OnModuleInit } from '@nestjs/common';
export declare class VaultService implements OnModuleInit {
    private readonly vaultPaths;
    private logger;
    private vault;
    private config;
    constructor(vaultPaths: string[]);
    onModuleInit(): Promise<void>;
    private init;
    private getVault;
    getAll(): {};
    get(key: any): any;
}

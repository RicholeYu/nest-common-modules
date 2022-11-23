import { OnModuleInit } from '@nestjs/common';
export declare class VaultService implements OnModuleInit {
    private logger;
    private vault;
    private config;
    onModuleInit(): Promise<void>;
    private init;
    private getVault;
    getAll(): {};
    get(key: any): any;
}

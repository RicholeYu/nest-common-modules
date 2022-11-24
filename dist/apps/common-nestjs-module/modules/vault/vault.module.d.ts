import { DynamicModule } from '@nestjs/common';
export declare class VaultModule {
    static forRoot(vaultPaths: string[]): DynamicModule;
}
export { VaultService } from './vault.service';

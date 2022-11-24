import {Module, Global, DynamicModule} from '@nestjs/common';
import {VaultService} from './vault.service';

@Global()
@Module({})
export class VaultModule {
  static forRoot(vaultPaths: string[]): DynamicModule {
    return {
      module: VaultModule,
      providers: [
        VaultService,
        {
          provide: 'vaultPaths',
          useValue: vaultPaths,
        },
      ],
      exports: [VaultService],
    };
  }
}

export {VaultService} from './vault.service';

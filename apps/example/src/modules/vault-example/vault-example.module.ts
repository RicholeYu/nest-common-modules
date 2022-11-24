import {Module} from '@nestjs/common';
import {VaultModule} from '@pruforce-coe/common-nestjs-module/src/main';
import {VaultExampleService} from './vault-example.service';

@Module({
  imports: [VaultModule.forRoot(['node', 'mongodb', 'azure'])],
  providers: [VaultExampleService],
})
export class VaultExampleModule {}

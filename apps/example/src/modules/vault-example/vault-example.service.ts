import {Injectable, OnModuleInit} from '@nestjs/common';
import {VaultService} from '@pruforce-coe/common-nestjs-module';

@Injectable()
export class VaultExampleService implements OnModuleInit {
  constructor(private readonly vaultService: VaultService) {}
  onModuleInit() {
    console.log(this.vaultService.get('kafka-sasl-username'));

    console.log(this.vaultService.getAll()['kafka-sasl-username']);
  }
}

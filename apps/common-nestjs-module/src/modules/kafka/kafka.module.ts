import {DynamicModule, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {VaultModule} from '../vault/vault.module';
import {KafkaService} from './kafka.service';
import {KafkaModuleOption} from './kafka.type';

@Module({})
export class KafkaModule {
  static feature(options: KafkaModuleOption): DynamicModule {
    Reflect.set(KafkaService, 'clientId', options.clientId);
    Reflect.set(KafkaService, 'groupId', options.groupId);

    return {
      module: KafkaModule,
      imports: [VaultModule.forRoot(['azure']), ConfigModule],
      providers: [
        KafkaService,
        {
          provide: 'clientId',
          useValue: options.clientId,
        },
        {
          provide: 'groupId',
          useValue: options.groupId,
        },
      ],
      exports: [KafkaService],
    };
  }
}

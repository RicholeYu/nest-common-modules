import {
  ClassSerializerInterceptor,
  DynamicModule,
  INestApplication,
  Logger,
  Module,
  OnModuleInit,
  ValidationPipe,
} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongoModule} from './mongo/mongo.module';
import {RestModule} from './rest/rest.module';
import {ServiceBusModule} from './service-bus/service-bus.module';
import {VaultModule} from './vault/vault.module';
import {PruModuleOptions} from './mono.type';
import {MonoService} from './mono.service';
import {Reflector} from '@nestjs/core';

@Module({
  imports: [ConfigModule, RestModule, VaultModule, ServiceBusModule],
  providers: [MonoService],
  exports: [MonoModule],
})
export class MonoModule {}

import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {VaultModule} from '../vault/vault.module';
import {KafkaService} from './kafka.service';

@Module({
  imports: [VaultModule, ConfigModule],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}

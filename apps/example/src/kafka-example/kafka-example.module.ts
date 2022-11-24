import {Module} from '@nestjs/common';
import {KafkaExampleService} from './kafka-example.service';
import {KafkaExampleController} from './kafka-example.controller';
import {KafkaModule} from '@pruforce-coe/common-nestjs-module';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    KafkaModule.feature({
      clientId: 'common-nestjs-module/example',
      groupId: 'common-nestjs-module/example',
    }),
    ConfigModule,
  ],
  providers: [KafkaExampleService],
  controllers: [KafkaExampleController],
})
export class KafkaExampleModule {}

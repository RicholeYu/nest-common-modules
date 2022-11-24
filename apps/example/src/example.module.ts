import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ExampleService} from './example.service';
import {KafkaExampleModule} from './kafka-example/kafka-example.module';
import {ServiceBusExampleModule} from './service-bus-example/service-bus-example.module';

@Module({
  imports: [KafkaExampleModule, ServiceBusExampleModule],
  providers: [ExampleService],
})
export class ExampleModule {}

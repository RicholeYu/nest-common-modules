import {Module} from '@nestjs/common';
import {ExampleService} from './example.service';
import {KafkaExampleModule} from './modules/kafka-example/kafka-example.module';
import {ServiceBusExampleModule} from './modules/service-bus-example/service-bus-example.module';
import {VaultExampleModule} from './modules/vault-example/vault-example.module';

@Module({
  imports: [KafkaExampleModule, ServiceBusExampleModule, VaultExampleModule],
  providers: [ExampleService],
})
export class ExampleModule {}

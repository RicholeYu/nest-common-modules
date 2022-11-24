import {Module} from '@nestjs/common';
import {ServiceBusExampleService} from './service-bus-example.service';
import {ServiceBusExampleController} from './service-bus-example.controller';
import {ServiceBusModule} from '@pruforce-coe/common-nestjs-module';

@Module({
  imports: [ServiceBusModule],
  providers: [ServiceBusExampleService],
  controllers: [ServiceBusExampleController],
})
export class ServiceBusExampleModule {}

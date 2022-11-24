import {Body, Controller, Post} from '@nestjs/common';
import {ServiceBusExampleService} from './service-bus-example.service';

@Controller('service-bus-example')
export class ServiceBusExampleController {
  constructor(private readonly serviceBusExampleService: ServiceBusExampleService) {}

  @Post('topic')
  sendTopicMessage(@Body() body: any) {
    this.serviceBusExampleService.sendTopicMessage(body);
  }

  @Post('queue')
  sendQueueMessage(@Body() body: any) {
    this.serviceBusExampleService.sendQueueMessage(body);
  }
}

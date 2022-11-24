import {Body, Controller, Post} from '@nestjs/common';
import {KafkaExampleService} from './kafka-example.service';

@Controller('kafka-example')
export class KafkaExampleController {
  constructor(private readonly kafkaExampleService: KafkaExampleService) {}

  @Post()
  sendMessage(@Body() body: any) {
    return this.kafkaExampleService.sendMessage(body);
  }
}

import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {KafkaService} from '@pruforce-coe/common-nestjs-module';

@Injectable()
export class KafkaExampleService implements OnModuleInit {
  logger = new Logger(KafkaExampleService.name);
  topic: string;

  constructor(private readonly kafkaService: KafkaService, private readonly configService: ConfigService) {}

  onModuleInit() {
    const prefix = this.configService.get('KAFKA_TOPIC_PREFIX');
    this.topic = prefix + 'custom_topic_name';

    this.kafkaService.subscribeTopicMessage(this.topic, (message) => {
      this.logger.log(JSON.stringify(message));
    });
  }

  sendMessage(data: any) {
    this.kafkaService.sendTopicMessage(this.topic, data);
  }
}

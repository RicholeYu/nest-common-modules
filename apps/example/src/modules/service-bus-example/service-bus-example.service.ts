import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {ServiceBusService} from '@pruforce-coe/common-nestjs-module';

@Injectable()
export class ServiceBusExampleService implements OnModuleInit {
  logger = new Logger(ServiceBusExampleService.name);

  constructor(private readonly serviceBusService: ServiceBusService) {}

  onModuleInit() {
    this.serviceBusService.subscribeTopic('custom-topic-name', 'custom-subscription-name', {
      processMessage: async (message) => {
        this.logger.log(message.body);
      },
      processError: async (error) => {
        this.logger.error(error);
      },
    });

    this.serviceBusService.subscribeQueue('custom-queue-name', {
      processMessage: async (message) => {
        this.logger.log(message.body);
      },
      processError: async (error) => {
        this.logger.error(error);
      },
    });
  }

  sendTopicMessage(data: any) {
    this.serviceBusService.sendTopic('custom-topic-name', data);
  }

  sendQueueMessage(data: any) {
    this.serviceBusService.sendQueue('custom-queue-name', data);
  }
}

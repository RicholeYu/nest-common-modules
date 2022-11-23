import {MessageHandlers, ServiceBusClient, ServiceBusReceiver, ServiceBusSender} from '@azure/service-bus';
import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {validate} from 'class-validator';
import {ServiceBusMessageDto} from '../../dto/message/service-bus-message.dto';
import {MessageConnectionException} from '../../exception/message-connection-exception';
import {MessageValidateException} from '../../exception/message-validate-exception';
import {RestService} from '../rest/rest.service';
import {ReceiversCache, SendersCache, ServiceBusPolicy, ServiceBusType} from './service-bus.type';

@Injectable()
export class ServiceBusService implements OnModuleInit {
  private topicSendersCache: SendersCache;
  private topicReceiversCache: ReceiversCache;
  private queueSendersCache: SendersCache;
  private queueReceiversCache: ReceiversCache;
  private logger = new Logger(ServiceBusService.name);

  onModuleInit() {
    this.logger.log('Service bus initializing...');
    this.logger.log('Service bus initialed...');
  }

  constructor(private readonly restService: RestService) {}

  private getConnectionString(type: ServiceBusType, policy: ServiceBusPolicy, name: string) {
    const azureResourceUrl = process.env.AZURE_RESOURCE_HOST || 'http://azure-resource-service';
    const url = `${azureResourceUrl}/servicebus/${type}/${name}/connectionString?policy=${policy}`;

    return this.restService
      .get(url)
      .then((res) => res.data.primary || res.data.secondary)
      .catch((err) => {
        this.logger.error(
          `Error occured on getting servicebus connection string type ${type} name: ${name} policy: ${policy}. Error message: ${err.message}`,
        );
        throw err;
      });
  }

  private async createClient(type: ServiceBusType, policy: ServiceBusPolicy, name: string): Promise<ServiceBusClient> {
    return new ServiceBusClient(await this.getConnectionString(type, policy, name));
  }

  private async getTopicSender(topic: string): Promise<ServiceBusSender> {
    if (this.topicSendersCache[topic]) {
      return this.topicSendersCache[topic];
    }

    this.topicSendersCache[topic] = (await this.createClient('topic', 'send', topic)).createSender(topic, {
      identifier: topic,
    });

    return this.topicSendersCache[topic];
  }

  private async getTopicReceiver(topic: string): Promise<ServiceBusReceiver> {
    if (this.topicReceiversCache[topic]) {
      return this.topicReceiversCache[topic];
    }

    this.topicReceiversCache[topic] = (await this.createClient('topic', 'listen', topic)).createReceiver(topic, {
      identifier: topic,
    });

    return this.topicReceiversCache[topic];
  }

  private async getQueueSender(queue: string): Promise<ServiceBusSender> {
    if (this.queueSendersCache[queue]) {
      return this.queueSendersCache[queue];
    }

    this.queueSendersCache[queue] = (await this.createClient('queue', 'send', queue)).createSender(queue);

    return this.queueSendersCache[queue];
  }

  private async getQueueReceiver(queue: string): Promise<ServiceBusReceiver> {
    if (this.queueReceiversCache[queue]) {
      return this.queueReceiversCache[queue];
    }

    this.queueReceiversCache[queue] = (await this.createClient('queue', 'listen', queue)).createReceiver(queue);

    return this.queueReceiversCache[queue];
  }

  public async sendTopic(topic: string, message: any) {
    message = new ServiceBusMessageDto(message);
    const result = await validate(message);

    if (result.length) {
      throw new MessageValidateException(result);
    }

    try {
      return (await this.getTopicSender(topic)).sendMessages(message);
    } catch (err) {
      this.logger.error(`send service bus topic failed: TOPIC: ${topic}, MESSAGE: ${JSON.stringify(message)}`);
      throw new MessageConnectionException(err);
    }
  }

  public async subscribeTopic(topic: string, handler: MessageHandlers) {
    try {
      return (await this.getTopicReceiver(topic)).subscribe(handler);
    } catch (err) {
      this.logger.error(`subscribe service bus topic failed: TOPIC: ${topic}`);
      throw new MessageConnectionException(err);
    }
  }

  public async sendQueue(queue: string, message: any) {
    message = new ServiceBusMessageDto(message);
    const result = await validate(message);

    if (result.length) {
      throw new MessageValidateException(result);
    }

    try {
      return (await this.getQueueSender(queue)).sendMessages(message);
    } catch (err) {
      this.logger.error(`send service bus queue failed: TOPIC: ${queue}, MESSAGE: ${JSON.stringify(message)}`);
      throw new MessageConnectionException(err);
    }
  }

  public async subscribeQueue(queue: string, handler: MessageHandlers) {
    try {
      return (await this.getQueueReceiver(queue)).subscribe(handler);
    } catch (err) {
      this.logger.error(`subscribe service bus queue failed: TOPIC: ${queue}`);
      throw new MessageConnectionException(err);
    }
  }
}

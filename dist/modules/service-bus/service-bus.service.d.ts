import { MessageHandlers } from '@azure/service-bus';
import { Logger, OnModuleInit } from '@nestjs/common';
import { RestService } from '../rest/rest.service';
import { ReceiversCache, SendersCache } from './service-bus.type';
export declare class ServiceBusService implements OnModuleInit {
    private readonly restService;
    topicSendersCache: SendersCache;
    topicReceiversCache: ReceiversCache;
    queueSendersCache: SendersCache;
    queueReceiversCache: ReceiversCache;
    logger: Logger;
    onModuleInit(): void;
    constructor(restService: RestService);
    private getConnectionString;
    private createClient;
    private getTopicSender;
    private getTopicReceiver;
    private getQueueSender;
    private getQueueReceiver;
    sendTopic(topic: string, message: any): Promise<void>;
    subscribeTopic(topic: string, handler: MessageHandlers): Promise<{
        close(): Promise<void>;
    }>;
    sendQueue(queue: string, message: any): Promise<void>;
    subscribeQueue(queue: string, handler: MessageHandlers): Promise<{
        close(): Promise<void>;
    }>;
}

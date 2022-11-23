import { MessageHandlers } from '@azure/service-bus';
import { OnModuleInit } from '@nestjs/common';
import { RestService } from '../rest/rest.service';
export declare class ServiceBusService implements OnModuleInit {
    private readonly restService;
    private topicSendersCache;
    private topicReceiversCache;
    private queueSendersCache;
    private queueReceiversCache;
    private logger;
    onModuleInit(): void;
    constructor(restService: RestService);
    private getConnectionString;
    private createClient;
    private getTopicSender;
    private getTopicReceiver;
    private getQueueSender;
    private getQueueReceiver;
    sendTopic(topic: string, message: any): Promise<void>;
    subscribeTopic(topic: string, subscription: string, handler: MessageHandlers): Promise<{
        close(): Promise<void>;
    }>;
    sendQueue(queue: string, message: any): Promise<void>;
    subscribeQueue(queue: string, handler: MessageHandlers): Promise<{
        close(): Promise<void>;
    }>;
}

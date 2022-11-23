import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VaultService } from '../vault/vault.service';
export declare class KafkaService implements OnModuleInit {
    private readonly vaultService;
    private readonly configService;
    private logger;
    private client;
    private pruducer;
    private consumer;
    private clientId;
    private groupId;
    private producerCache;
    private consumerCache;
    constructor(vaultService: VaultService, configService: ConfigService);
    onModuleInit(): Promise<void>;
    private initKafkaConnection;
    sendTopicMessage(topic: string, message: any): Promise<import("kafkajs").RecordMetadata[]>;
    subscribeTopicMessage(topic: string, handler: any): Promise<void>;
}

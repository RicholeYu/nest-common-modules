import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VaultService } from '../vault/vault.service';
export declare class KafkaService implements OnModuleInit {
    private readonly vaultService;
    private readonly configService;
    private logger;
    private client;
    private producerCache;
    private consumerCache;
    private clientId;
    private groupId;
    constructor(vaultService: VaultService, configService: ConfigService);
    onModuleInit(): Promise<void>;
    private initKafkaConnection;
    sendTopicMessage(topic: string, message: any): Promise<import("kafkajs").RecordMetadata[]>;
    subscribeTopicMessage(topic: string, handler: any): Promise<void>;
}

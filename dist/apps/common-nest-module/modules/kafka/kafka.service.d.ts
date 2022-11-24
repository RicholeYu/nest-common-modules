import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VaultService } from '../vault/vault.service';
export declare class KafkaService implements OnModuleInit {
    private readonly vaultService;
    private readonly configService;
    private readonly clientId;
    private readonly groupId;
    private logger;
    private client;
    private producerCache;
    private consumerCache;
    constructor(vaultService: VaultService, configService: ConfigService, clientId: string, groupId: string);
    onModuleInit(): Promise<void>;
    private initKafkaConnection;
    sendTopicMessage(topic: string, message: any): Promise<import("kafkajs").RecordMetadata[]>;
    subscribeTopicMessage(topic: string, handler: any): Promise<void>;
}

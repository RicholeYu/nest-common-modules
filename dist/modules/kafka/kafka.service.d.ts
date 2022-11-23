import { Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, Kafka, Producer } from 'kafkajs';
import { VaultService } from '../vault/vault.service';
import { ConsumerCache, ProducerCache } from './kafka.type';
export declare class KafkaService implements OnModuleInit {
    private readonly vaultService;
    private readonly configService;
    logger: Logger;
    client: Kafka;
    pruducer: Producer;
    consumer: Consumer;
    clientId: string;
    groupId: string;
    producerCache: ProducerCache;
    consumerCache: ConsumerCache;
    constructor(vaultService: VaultService, configService: ConfigService);
    onModuleInit(): Promise<void>;
    private initKafkaConnection;
    sendTopicMessage(topic: string, message: any): Promise<import("kafkajs").RecordMetadata[]>;
    receiveTopicMessage(topic: string, handler: any): Promise<void>;
}

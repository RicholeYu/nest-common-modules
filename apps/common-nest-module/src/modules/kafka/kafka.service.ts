import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {logLevel} from '@nestjs/microservices/external/kafka.interface';
import {validate} from 'class-validator';
import {Consumer, Kafka, Producer} from 'kafkajs';
import {KafkaMessageDto} from '../../dto/message/kafka-message.dto';
import {MessageValidateException} from '../../exception/message-validate-exception';
import {VaultService} from '../vault/vault.service';
import {ConsumerCache, ProducerCache} from './kafka.type';

@Injectable()
export class KafkaService implements OnModuleInit {
  private logger = new Logger(KafkaService.name);
  private client: Kafka;
  private producerCache: ProducerCache = {};
  private consumerCache: ConsumerCache = {};
  private clientId: string;
  private groupId: string;

  constructor(private readonly vaultService: VaultService, private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.logger.log('kafka initializing...');
    try {
      await this.initKafkaConnection();
      this.logger.log('kafka initialed...');
    } catch (err) {
      this.logger.error('kafka init failed...');
      this.logger.error(err.toString());
    }
  }

  private async initKafkaConnection() {
    const kafkaSecurityProtocol = this.configService.get('KAFKA_SECURITY_PROTOCOL');
    const kafkaConnection = this.configService.get('KAFKA_SERVER_HOST_PORT');
    const kafkaSaslMechanisms = this.configService.get('KAFKA_SASL_MECHANISMS');
    const clientId = (this.clientId = Reflect.get(KafkaService, 'clientId'));
    this.groupId = Reflect.get(KafkaService, 'groupId');

    console.log(clientId, this.groupId);

    if (!kafkaConnection) {
      this.logger.error('lack of environment variable KAFKA_SERVER_HOST_PORT, failed to connect kafka');
    }

    if (kafkaSecurityProtocol === 'SASL') {
      const username = this.vaultService.get('kafka_sasl_username');
      const password = this.vaultService.get('kafka_sasl_password');

      if (username && password) {
        this.client = new Kafka({
          clientId,
          brokers: [kafkaConnection],
          sasl: {
            username,
            password,
            mechanism: kafkaSaslMechanisms,
          },
        });
      } else {
        this.logger.error(
          'environment variable KAFKA_SASL_MECHANISMS is SASL, but get empty username andd passwd in vault',
        );
      }
    }

    this.client =
      this.client ||
      new Kafka({
        clientId,
        brokers: [kafkaConnection],
        logCreator:
          () =>
          ({level, log}) => {
            switch (level) {
              case logLevel.ERROR:
              case logLevel.NOTHING:
                return this.logger.error(log.message);
              case logLevel.WARN:
                return this.logger.warn(log.message);
            }
          },
      });
  }

  public async sendTopicMessage(topic: string, message: any) {
    message = new KafkaMessageDto(message);
    const result = await validate(message);

    if (result.length) {
      throw new MessageValidateException(result);
    }

    const pruducer = (this.producerCache[topic] = this.producerCache[topic] || this.client.producer());

    try {
      await pruducer.connect();

      return pruducer.send({
        topic: topic,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      });
    } catch {
      delete this.producerCache[topic];
      await pruducer.disconnect();
      this.logger.error(
        `connect kafka and send topic message failed. TOPIC: ${topic}, MESSAGE: ${JSON.stringify(message)}`,
      );
    }
  }

  public async subscribeTopicMessage(topic: string, handler: any) {
    const consumer = (this.consumerCache[topic] =
      this.consumerCache[topic] ||
      this.client.consumer({
        groupId: this.groupId,
      }));

    try {
      await consumer.connect();
      await consumer.subscribe({
        topic,
        fromBeginning: false,
      });

      consumer.run({
        eachMessage: async ({message}) => {
          handler(JSON.parse(message.value.toString()));
        },
      });
    } catch {
      delete this.consumerCache[topic];
      await consumer.disconnect();
      this.logger.error(`connect kafka and subscribe topic messages failed. TOPIC: ${topic}`);
    }
  }
}

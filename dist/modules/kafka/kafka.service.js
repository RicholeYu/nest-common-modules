"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var KafkaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const kafka_interface_1 = require("@nestjs/microservices/external/kafka.interface");
const class_validator_1 = require("class-validator");
const kafkajs_1 = require("kafkajs");
const kafka_message_dto_1 = require("../../dto/message/kafka-message.dto");
const message_validate_exception_1 = require("../../exception/message-validate-exception");
const vault_service_1 = require("../vault/vault.service");
let KafkaService = KafkaService_1 = class KafkaService {
    constructor(vaultService, configService) {
        this.vaultService = vaultService;
        this.configService = configService;
        this.logger = new common_1.Logger(KafkaService_1.name);
        this.producerCache = {};
        this.consumerCache = {};
    }
    async onModuleInit() {
        this.logger.log('kafka initializing...');
        try {
            await this.initKafkaConnection();
            this.logger.log('kafka initialed...');
        }
        catch (err) {
            this.logger.error('kafka init failed...');
            this.logger.error(err.toString());
        }
    }
    async initKafkaConnection() {
        const kafkaSecurityProtocol = this.configService.get('KAFKA_SECURITY_PROTOCOL');
        const kafkaConnection = this.configService.get('KAFKA_SERVER_HOST_PORT');
        const kafkaSaslMechanisms = this.configService.get('KAFKA_SASL_MECHANISMS');
        this.clientId = this.configService.get('npm_package_name');
        this.groupId = this.clientId;
        if (!kafkaConnection) {
            this.logger.error('lack of environment variable KAFKA_SERVER_HOST_PORT, failed to connect kafka');
        }
        if (kafkaSecurityProtocol === 'SASL') {
            const username = this.vaultService.get('kafka_sasl_username');
            const password = this.vaultService.get('kafka_sasl_password');
            if (username && password) {
                this.client = new kafkajs_1.Kafka({
                    clientId: this.clientId,
                    brokers: [kafkaConnection],
                    sasl: {
                        username,
                        password,
                        mechanism: kafkaSaslMechanisms,
                    },
                });
            }
            else {
                this.logger.error('environment variable KAFKA_SASL_MECHANISMS is SASL, but get empty username andd passwd in vault');
            }
        }
        this.client =
            this.client ||
                new kafkajs_1.Kafka({
                    clientId: this.clientId,
                    brokers: [kafkaConnection],
                    logCreator: () => ({ level, log }) => {
                        switch (level) {
                            case kafka_interface_1.logLevel.ERROR:
                            case kafka_interface_1.logLevel.NOTHING:
                                return this.logger.error(log.message);
                            case kafka_interface_1.logLevel.WARN:
                                return this.logger.warn(log.message);
                        }
                    },
                });
    }
    async sendTopicMessage(topic, message) {
        message = new kafka_message_dto_1.KafkaMessageDto(message);
        const result = await (0, class_validator_1.validate)(message);
        if (result.length) {
            throw new message_validate_exception_1.MessageValidateException(result);
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
        }
        catch {
            delete this.producerCache[topic];
            await pruducer.disconnect();
            this.logger.error(`connect kafka and send topic message failed. TOPIC: ${topic}, MESSAGE: ${JSON.stringify(message)}`);
        }
    }
    async receiveTopicMessage(topic, handler) {
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
                eachMessage: async ({ message }) => {
                    handler(JSON.parse(message.value.toString()));
                },
            });
        }
        catch {
            delete this.consumerCache[topic];
            await consumer.disconnect();
            this.logger.error(`connect kafka and subscribe topic messages failed. TOPIC: ${topic}`);
        }
    }
};
KafkaService = KafkaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [vault_service_1.VaultService, config_1.ConfigService])
], KafkaService);
exports.KafkaService = KafkaService;
//# sourceMappingURL=kafka.service.js.map
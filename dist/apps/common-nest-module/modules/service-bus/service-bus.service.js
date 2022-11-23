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
var ServiceBusService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBusService = void 0;
const service_bus_1 = require("@azure/service-bus");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const service_bus_message_dto_1 = require("../../dto/message/service-bus-message.dto");
const message_connection_exception_1 = require("../../exception/message-connection-exception");
const message_validate_exception_1 = require("../../exception/message-validate-exception");
const rest_service_1 = require("../rest/rest.service");
let ServiceBusService = ServiceBusService_1 = class ServiceBusService {
    onModuleInit() {
        this.logger.log('Service bus initializing...');
        this.logger.log('Service bus initialed...');
    }
    constructor(restService) {
        this.restService = restService;
        this.topicSendersCache = {};
        this.topicReceiversCache = {};
        this.queueSendersCache = {};
        this.queueReceiversCache = {};
        this.logger = new common_1.Logger(ServiceBusService_1.name);
    }
    getConnectionString(type, policy, name) {
        const azureResourceUrl = process.env.AZURE_RESOURCE_HOST || 'http://azure-resource-service';
        const url = `${azureResourceUrl}/servicebus/${type}/${name}/connectionString?policy=${policy}`;
        return this.restService
            .get(url)
            .then((res) => res.data.primary || res.data.secondary)
            .catch((err) => {
            this.logger.error(`Error occured on getting servicebus connection string type ${type} name: ${name} policy: ${policy}. Error message: ${err.message}`);
            throw err;
        });
    }
    async createClient(type, policy, name) {
        return new service_bus_1.ServiceBusClient(await this.getConnectionString(type, policy, name));
    }
    async getTopicSender(topic) {
        if (this.topicSendersCache[topic]) {
            return this.topicSendersCache[topic];
        }
        this.topicSendersCache[topic] = (await this.createClient('topic', 'send', topic)).createSender(topic, {
            identifier: topic,
        });
        return this.topicSendersCache[topic];
    }
    async getTopicReceiver(topic, subscription) {
        if (this.topicReceiversCache[topic]) {
            return this.topicReceiversCache[topic];
        }
        this.topicReceiversCache[topic] = (await this.createClient('topic', 'listen', topic)).createReceiver(topic, subscription, {
            identifier: topic,
        });
        return this.topicReceiversCache[topic];
    }
    async getQueueSender(queue) {
        if (this.queueSendersCache[queue]) {
            return this.queueSendersCache[queue];
        }
        this.queueSendersCache[queue] = (await this.createClient('queue', 'send', queue)).createSender(queue);
        return this.queueSendersCache[queue];
    }
    async getQueueReceiver(queue) {
        if (this.queueReceiversCache[queue]) {
            return this.queueReceiversCache[queue];
        }
        this.queueReceiversCache[queue] = (await this.createClient('queue', 'listen', queue)).createReceiver(queue);
        return this.queueReceiversCache[queue];
    }
    async sendTopic(topic, message) {
        message = new service_bus_message_dto_1.ServiceBusMessageDto(message);
        const result = await (0, class_validator_1.validate)(message);
        if (result.length) {
            throw new message_validate_exception_1.MessageValidateException(result);
        }
        try {
            return (await this.getTopicSender(topic)).sendMessages({
                body: message,
            });
        }
        catch (err) {
            this.logger.error(`send service bus topic failed: TOPIC: ${topic}, MESSAGE: ${JSON.stringify(message)}`);
            throw new message_connection_exception_1.MessageConnectionException(err);
        }
    }
    async subscribeTopic(topic, subscription, handler) {
        try {
            return (await this.getTopicReceiver(topic, subscription)).subscribe(handler);
        }
        catch (err) {
            this.logger.error(`subscribe service bus topic failed: TOPIC: ${topic}`);
            throw new message_connection_exception_1.MessageConnectionException(err);
        }
    }
    async sendQueue(queue, message) {
        message = new service_bus_message_dto_1.ServiceBusMessageDto(message);
        const result = await (0, class_validator_1.validate)(message);
        if (result.length) {
            throw new message_validate_exception_1.MessageValidateException(result);
        }
        try {
            return (await this.getQueueSender(queue)).sendMessages({
                body: message,
            });
        }
        catch (err) {
            this.logger.error(`send service bus queue failed: TOPIC: ${queue}, MESSAGE: ${JSON.stringify(message)}`);
            throw new message_connection_exception_1.MessageConnectionException(err);
        }
    }
    async subscribeQueue(queue, handler) {
        try {
            return (await this.getQueueReceiver(queue)).subscribe(handler);
        }
        catch (err) {
            this.logger.error(`subscribe service bus queue failed: TOPIC: ${queue}`);
            throw new message_connection_exception_1.MessageConnectionException(err);
        }
    }
};
ServiceBusService = ServiceBusService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rest_service_1.RestService])
], ServiceBusService);
exports.ServiceBusService = ServiceBusService;
//# sourceMappingURL=service-bus.service.js.map
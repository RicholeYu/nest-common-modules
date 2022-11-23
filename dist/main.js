/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KafkaMessageDto = exports.KafkaDataDto = void 0;
const class_transformer_1 = __webpack_require__(2);
const class_validator_1 = __webpack_require__(3);
const message_dto_1 = __webpack_require__(4);
const cls_rtracer_1 = __importDefault(__webpack_require__(6));
class KafkaDataDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KafkaDataDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", String)
], KafkaDataDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", String)
], KafkaDataDto.prototype, "module", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", String)
], KafkaDataDto.prototype, "feature", void 0);
exports.KafkaDataDto = KafkaDataDto;
class KafkaMessageDto extends message_dto_1.MessageDto {
    constructor(data) {
        super();
        this.specversion = '1.0';
        this.type = data.type;
        this.source = data.source;
        this.subject = data.subject;
        this.id = data.id || cls_rtracer_1.default.id();
        this.time = new Date();
        this.datacontenttype = 'application/json';
        this.data = data.data;
    }
}
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)(() => KafkaDataDto),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", KafkaDataDto)
], KafkaMessageDto.prototype, "data", void 0);
exports.KafkaMessageDto = KafkaMessageDto;


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageDto = void 0;
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(3);
class MessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The version of the CloudEvents specification which the event uses.',
        example: '1.0',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], MessageDto.prototype, "specversion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Describes the type of event related to the originating occurrence.',
        example: ['com.github.pull_request.opened', 'com.example.object.deleted.v2'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], MessageDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identifies the event.',
        example: 'A234-1234-1234',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], MessageDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identifies the context in which an event happened.',
        examples: [
            'https://github.com/cloudevents',
            'mailto:cncf-wg-serverless@lists.cncf.io',
            'urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66',
            'cloudevents/spec/pull/123',
            '/sensors/tn-1234567/alerts',
            '1-555-123-4567',
        ],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], MessageDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Content type of the data value. Must adhere to RFC 2046 format.',
        examples: ['text/xml', 'application/json', 'image/png', 'multipart/form-data'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], MessageDto.prototype, "datacontenttype", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Identifies the schema that data adheres to.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], MessageDto.prototype, "dataschema", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Describes the subject of the event in the context of the event producer (identified by source).',
        example: 'mynewfile.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], MessageDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The version of the CloudEvents specification which the event uses.',
        example: '1.0',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], MessageDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], MessageDto.prototype, "data", void 0);
exports.MessageDto = MessageDto;


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("cls-rtracer");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceBusMessageDto = void 0;
const message_dto_1 = __webpack_require__(4);
const cls_rtracer_1 = __importDefault(__webpack_require__(6));
class ServiceBusMessageDto extends message_dto_1.MessageDto {
    constructor(data) {
        super();
        this.specversion = '1.0';
        this.type = data.type;
        this.source = data.source;
        this.subject = data.subject;
        this.id = data.id || cls_rtracer_1.default.id();
        this.time = new Date();
        this.datacontenttype = 'application/json';
        this.data = data.data;
    }
}
exports.ServiceBusMessageDto = ServiceBusMessageDto;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageConnectionException = void 0;
const common_1 = __webpack_require__(9);
class MessageConnectionException extends common_1.GatewayTimeoutException {
    constructor(error) {
        super();
        this.error = error;
    }
}
exports.MessageConnectionException = MessageConnectionException;


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageValidateException = void 0;
const common_1 = __webpack_require__(9);
class MessageValidateException extends common_1.BadRequestException {
    constructor(error) {
        super();
        this.error = error;
    }
}
exports.MessageValidateException = MessageValidateException;


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KafkaModule = void 0;
const common_1 = __webpack_require__(9);
const config_1 = __webpack_require__(12);
const vault_module_1 = __webpack_require__(13);
const kafka_service_1 = __webpack_require__(17);
let KafkaModule = class KafkaModule {
};
KafkaModule = __decorate([
    (0, common_1.Module)({
        imports: [vault_module_1.VaultModule, config_1.ConfigModule],
        providers: [kafka_service_1.KafkaService],
        exports: [kafka_service_1.KafkaService],
    })
], KafkaModule);
exports.KafkaModule = KafkaModule;


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VaultService = exports.VaultModule = void 0;
const common_1 = __webpack_require__(9);
const vault_service_1 = __webpack_require__(14);
let VaultModule = class VaultModule {
};
VaultModule = __decorate([
    (0, common_1.Module)({
        providers: [vault_service_1.VaultService],
        exports: [vault_service_1.VaultService],
    })
], VaultModule);
exports.VaultModule = VaultModule;
var vault_service_2 = __webpack_require__(14);
Object.defineProperty(exports, "VaultService", ({ enumerable: true, get: function () { return vault_service_2.VaultService; } }));


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var VaultService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VaultService = void 0;
const common_1 = __webpack_require__(9);
const node_vault_1 = __importDefault(__webpack_require__(15));
const fs_1 = __importDefault(__webpack_require__(16));
let VaultService = VaultService_1 = class VaultService {
    constructor() {
        this.logger = new common_1.Logger(VaultService_1.name);
        this.config = {};
    }
    async onModuleInit() {
        this.logger.log(`Vault Initializing...`);
        try {
            await this.init();
            this.logger.log(`Vault initialize successfully: ${Object.keys(this.config)}`);
        }
        catch (e) {
            this.logger.error('Vault init failed.');
            this.logger.error(e.toString());
        }
    }
    async init() {
        const endpoint = process.env.VAULT_ADDR;
        const token = process.env.VAULT_TOKEN;
        const tokenFile = process.env.KUBE_SA_TOKEN_FILE;
        this.vault = (0, node_vault_1.default)({
            endpoint,
            token,
        });
        if (!token && tokenFile) {
            this.logger.log('Connecting to Vault...');
            await this.vault.kubernetesLogin({
                mount_point: process.env.VAULT_KUBE_AUTH_PATH,
                role: process.env.VAULT_KUBE_AUTH_ROLE,
                jwt: fs_1.default.readFileSync(tokenFile, 'utf-8'),
            });
            this.logger.log('Vault connected...');
        }
        this.logger.log('Getting Vault values...');
        return Promise.all([
            this.getVault('/spring'),
            this.getVault('/node'),
            this.getVault('/mongodb'),
            this.getVault('/azure'),
        ]);
    }
    async getVault(key) {
        var _a;
        const vaultSecretEngine = process.env.VAULT_SECRET_ENGINE;
        const vaultSecretDataPath = process.env.VAULT_SECRET_DATA_PATH;
        const vaultKey = `${vaultSecretEngine}/data/${vaultSecretDataPath}${key}`;
        this.logger.log(`Getting vault: ${vaultKey}`);
        const result = await this.vault.read(vaultKey);
        this.config = {
            ...this.config,
            ...(((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.data) || {}),
        };
    }
    getAll() {
        return this.config;
    }
    get(key) {
        return this.config[key] || null;
    }
};
VaultService = VaultService_1 = __decorate([
    (0, common_1.Injectable)()
], VaultService);
exports.VaultService = VaultService;


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("node-vault");

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KafkaService = void 0;
const common_1 = __webpack_require__(9);
const config_1 = __webpack_require__(12);
const kafka_interface_1 = __webpack_require__(18);
const class_validator_1 = __webpack_require__(3);
const kafkajs_1 = __webpack_require__(19);
const kafka_message_dto_1 = __webpack_require__(1);
const message_validate_exception_1 = __webpack_require__(10);
const vault_service_1 = __webpack_require__(14);
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
    __metadata("design:paramtypes", [typeof (_a = typeof vault_service_1.VaultService !== "undefined" && vault_service_1.VaultService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], KafkaService);
exports.KafkaService = KafkaService;


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices/external/kafka.interface");

/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("kafkajs");

/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RestService = void 0;
const axios_1 = __webpack_require__(21);
const common_1 = __webpack_require__(9);
const internal_service_exception_1 = __webpack_require__(22);
let RestService = class RestService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    get axiosRef() {
        return this.httpService.axiosRef;
    }
    request(config) {
        return this.httpService
            .request(config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
    delete(url, config) {
        return this.httpService
            .delete(url, config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
    get(url, config) {
        return this.httpService
            .get(url, config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
    head(url, config) {
        return this.httpService
            .head(url, config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
    patch(url, data, config) {
        return this.httpService
            .patch(url, data, config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
    post(url, data, config) {
        return this.httpService
            .post(url, data, config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
    put(url, data, config) {
        return this.httpService
            .put(url, data, config)
            .toPromise()
            .catch((err) => {
            throw new internal_service_exception_1.InternalServiceException(err);
        });
    }
};
RestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], RestService);
exports.RestService = RestService;


/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InternalServiceException = void 0;
const common_1 = __webpack_require__(9);
class InternalServiceException extends common_1.ServiceUnavailableException {
    constructor(error) {
        super();
        this.error = error;
    }
    isAxiosError() {
        return this.error.isAxiosError;
    }
}
exports.InternalServiceException = InternalServiceException;


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RestModule = void 0;
const axios_1 = __webpack_require__(21);
const common_1 = __webpack_require__(9);
const rest_service_1 = __webpack_require__(20);
let RestModule = class RestModule {
};
RestModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [rest_service_1.RestService],
        exports: [rest_service_1.RestService],
    })
], RestModule);
exports.RestModule = RestModule;


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceBusService = exports.ServiceBusModule = void 0;
const common_1 = __webpack_require__(9);
const rest_module_1 = __webpack_require__(23);
const service_bus_service_1 = __webpack_require__(25);
let ServiceBusModule = class ServiceBusModule {
};
ServiceBusModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [rest_module_1.RestModule],
        providers: [service_bus_service_1.ServiceBusService],
        exports: [service_bus_service_1.ServiceBusService],
    })
], ServiceBusModule);
exports.ServiceBusModule = ServiceBusModule;
var service_bus_service_2 = __webpack_require__(25);
Object.defineProperty(exports, "ServiceBusService", ({ enumerable: true, get: function () { return service_bus_service_2.ServiceBusService; } }));


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceBusService = void 0;
const service_bus_1 = __webpack_require__(26);
const common_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(3);
const service_bus_message_dto_1 = __webpack_require__(7);
const message_connection_exception_1 = __webpack_require__(8);
const message_validate_exception_1 = __webpack_require__(10);
const rest_service_1 = __webpack_require__(20);
let ServiceBusService = ServiceBusService_1 = class ServiceBusService {
    onModuleInit() {
        this.logger.log('Service bus initializing...');
        this.logger.log('Service bus initialed...');
    }
    constructor(restService) {
        this.restService = restService;
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
    async getTopicReceiver(topic) {
        if (this.topicReceiversCache[topic]) {
            return this.topicReceiversCache[topic];
        }
        this.topicReceiversCache[topic] = (await this.createClient('topic', 'listen', topic)).createReceiver(topic, {
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
            return (await this.getTopicSender(topic)).sendMessages(message);
        }
        catch (err) {
            this.logger.error(`send service bus topic failed: TOPIC: ${topic}, MESSAGE: ${JSON.stringify(message)}`);
            throw new message_connection_exception_1.MessageConnectionException(err);
        }
    }
    async subscribeTopic(topic, handler) {
        try {
            return (await this.getTopicReceiver(topic)).subscribe(handler);
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
            return (await this.getQueueSender(queue)).sendMessages(message);
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
    __metadata("design:paramtypes", [typeof (_a = typeof rest_service_1.RestService !== "undefined" && rest_service_1.RestService) === "function" ? _a : Object])
], ServiceBusService);
exports.ServiceBusService = ServiceBusService;


/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("@azure/service-bus");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VaultService = exports.VaultModule = exports.ServiceBusService = exports.ServiceBusModule = exports.RestModule = exports.RestService = exports.KafkaService = exports.KafkaModule = exports.MessageValidateException = exports.MessageConnectionException = exports.ServiceBusMessageDto = exports.KafkaMessageDto = void 0;
var kafka_message_dto_1 = __webpack_require__(1);
Object.defineProperty(exports, "KafkaMessageDto", ({ enumerable: true, get: function () { return kafka_message_dto_1.KafkaMessageDto; } }));
var service_bus_message_dto_1 = __webpack_require__(7);
Object.defineProperty(exports, "ServiceBusMessageDto", ({ enumerable: true, get: function () { return service_bus_message_dto_1.ServiceBusMessageDto; } }));
var message_connection_exception_1 = __webpack_require__(8);
Object.defineProperty(exports, "MessageConnectionException", ({ enumerable: true, get: function () { return message_connection_exception_1.MessageConnectionException; } }));
var message_validate_exception_1 = __webpack_require__(10);
Object.defineProperty(exports, "MessageValidateException", ({ enumerable: true, get: function () { return message_validate_exception_1.MessageValidateException; } }));
var kafka_module_1 = __webpack_require__(11);
Object.defineProperty(exports, "KafkaModule", ({ enumerable: true, get: function () { return kafka_module_1.KafkaModule; } }));
var kafka_service_1 = __webpack_require__(17);
Object.defineProperty(exports, "KafkaService", ({ enumerable: true, get: function () { return kafka_service_1.KafkaService; } }));
var rest_service_1 = __webpack_require__(20);
Object.defineProperty(exports, "RestService", ({ enumerable: true, get: function () { return rest_service_1.RestService; } }));
var rest_module_1 = __webpack_require__(23);
Object.defineProperty(exports, "RestModule", ({ enumerable: true, get: function () { return rest_module_1.RestModule; } }));
var service_bus_module_1 = __webpack_require__(24);
Object.defineProperty(exports, "ServiceBusModule", ({ enumerable: true, get: function () { return service_bus_module_1.ServiceBusModule; } }));
var service_bus_service_1 = __webpack_require__(25);
Object.defineProperty(exports, "ServiceBusService", ({ enumerable: true, get: function () { return service_bus_service_1.ServiceBusService; } }));
var vault_module_1 = __webpack_require__(13);
Object.defineProperty(exports, "VaultModule", ({ enumerable: true, get: function () { return vault_module_1.VaultModule; } }));
var vault_service_1 = __webpack_require__(14);
Object.defineProperty(exports, "VaultService", ({ enumerable: true, get: function () { return vault_service_1.VaultService; } }));

})();

/******/ })()
;
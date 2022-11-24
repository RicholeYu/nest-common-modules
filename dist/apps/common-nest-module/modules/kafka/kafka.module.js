"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KafkaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const vault_module_1 = require("../vault/vault.module");
const kafka_service_1 = require("./kafka.service");
let KafkaModule = KafkaModule_1 = class KafkaModule {
    static forRoot(options) {
        Reflect.set(kafka_service_1.KafkaService, 'clientId', options.clientId);
        Reflect.set(kafka_service_1.KafkaService, 'groupId', options.groupId);
        return {
            module: KafkaModule_1,
            imports: [vault_module_1.VaultModule, config_1.ConfigModule],
            providers: [kafka_service_1.KafkaService],
            exports: [kafka_service_1.KafkaService],
        };
    }
};
KafkaModule = KafkaModule_1 = __decorate([
    (0, common_1.Module)({})
], KafkaModule);
exports.KafkaModule = KafkaModule;
//# sourceMappingURL=kafka.module.js.map
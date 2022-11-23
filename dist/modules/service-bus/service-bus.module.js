"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBusService = exports.ServiceBusModule = void 0;
const common_1 = require("@nestjs/common");
const rest_module_1 = require("../rest/rest.module");
const service_bus_service_1 = require("./service-bus.service");
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
var service_bus_service_2 = require("./service-bus.service");
Object.defineProperty(exports, "ServiceBusService", { enumerable: true, get: function () { return service_bus_service_2.ServiceBusService; } });
//# sourceMappingURL=service-bus.module.js.map
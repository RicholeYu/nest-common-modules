"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultService = exports.VaultModule = void 0;
const common_1 = require("@nestjs/common");
const vault_service_1 = require("./vault.service");
let VaultModule = class VaultModule {
};
VaultModule = __decorate([
    (0, common_1.Module)({
        providers: [vault_service_1.VaultService],
        exports: [vault_service_1.VaultService],
    })
], VaultModule);
exports.VaultModule = VaultModule;
var vault_service_2 = require("./vault.service");
Object.defineProperty(exports, "VaultService", { enumerable: true, get: function () { return vault_service_2.VaultService; } });
//# sourceMappingURL=vault.module.js.map
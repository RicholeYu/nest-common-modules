"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoService = exports.MongoModule = void 0;
const common_1 = require("@nestjs/common");
const mongo_service_1 = require("./mongo.service");
let MongoModule = class MongoModule {
};
MongoModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [mongo_service_1.MongoService],
        exports: [mongo_service_1.MongoService],
    })
], MongoModule);
exports.MongoModule = MongoModule;
var mongo_service_2 = require("./mongo.service");
Object.defineProperty(exports, "MongoService", { enumerable: true, get: function () { return mongo_service_2.MongoService; } });
//# sourceMappingURL=mongo.module.js.map
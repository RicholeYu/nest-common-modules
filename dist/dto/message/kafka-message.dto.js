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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaMessageDto = exports.KafkaDataDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const message_dto_1 = require("./message.dto");
const cls_rtracer_1 = __importDefault(require("cls-rtracer"));
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
//# sourceMappingURL=kafka-message.dto.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBusMessageDto = void 0;
const message_dto_1 = require("./message.dto");
const cls_rtracer_1 = __importDefault(require("cls-rtracer"));
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
//# sourceMappingURL=service-bus-message.dto.js.map
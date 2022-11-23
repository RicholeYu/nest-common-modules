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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
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
    __metadata("design:type", Date)
], MessageDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], MessageDto.prototype, "data", void 0);
exports.MessageDto = MessageDto;
//# sourceMappingURL=message.dto.js.map
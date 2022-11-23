"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageValidateException = void 0;
const common_1 = require("@nestjs/common");
class MessageValidateException extends common_1.BadRequestException {
    constructor(error) {
        super();
        this.error = error;
    }
}
exports.MessageValidateException = MessageValidateException;
//# sourceMappingURL=message-validate-exception.js.map
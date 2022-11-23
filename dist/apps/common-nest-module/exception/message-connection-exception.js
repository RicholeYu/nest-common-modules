"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageConnectionException = void 0;
const common_1 = require("@nestjs/common");
class MessageConnectionException extends common_1.GatewayTimeoutException {
    constructor(error) {
        super();
        this.error = error;
    }
}
exports.MessageConnectionException = MessageConnectionException;
//# sourceMappingURL=message-connection-exception.js.map
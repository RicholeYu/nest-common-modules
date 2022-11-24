"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServiceException = void 0;
const common_1 = require("@nestjs/common");
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
//# sourceMappingURL=internal-service.exception.js.map
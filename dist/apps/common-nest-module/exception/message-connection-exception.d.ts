import { GatewayTimeoutException } from '@nestjs/common';
export declare class MessageConnectionException extends GatewayTimeoutException {
    error: any;
    constructor(error: any);
}

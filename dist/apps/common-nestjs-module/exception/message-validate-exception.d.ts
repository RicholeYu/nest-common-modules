import { BadRequestException } from '@nestjs/common';
export declare class MessageValidateException extends BadRequestException {
    error: any;
    constructor(error: any);
}

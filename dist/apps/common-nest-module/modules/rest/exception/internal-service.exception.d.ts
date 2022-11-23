import { ServiceUnavailableException } from '@nestjs/common';
export declare class InternalServiceException extends ServiceUnavailableException {
    error: any;
    constructor(error: any);
    isAxiosError(): any;
}

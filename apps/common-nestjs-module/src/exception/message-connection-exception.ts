import {GatewayTimeoutException} from '@nestjs/common';

export class MessageConnectionException extends GatewayTimeoutException {
  public error;

  constructor(error: any) {
    super();
    this.error = error;
  }
}

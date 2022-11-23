import {BadRequestException} from '@nestjs/common';

export class MessageValidateException extends BadRequestException {
  public error;

  constructor(error: any) {
    super();
    this.error = error;
  }
}

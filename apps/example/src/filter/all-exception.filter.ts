import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger} from '@nestjs/common';
import {AxiosError} from 'axios';
import {Request, Response} from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  private readonly serviceName;

  constructor() {
    this.serviceName = AllExceptionFilter.name;
  }

  catch(exception: HttpException | AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.unknownException(exception, request, response);
  }

  private unknownException(exception: unknown, request: any, response: any) {
    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = 'Service error';
    const errorMessage = exception instanceof HttpException ? exception.message : 'Unknown error';
    response.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      code: 500,
      errors: [
        {
          message: errorMessage,
          code: 500,
        },
      ],
    });
  }
}

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from 'src/model/api.response';
import { MyLogger } from '../logging/logger';
import { FileLoggerService } from '../logging/file-logger.service';
import { MongoDbErrors } from 'src/utils/constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const code = exception.code; // mongoDB error
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // const errorResponse = {
    //   code: status,
    //   timestamp: new Date().toLocaleDateString(),
    //   path: request.url,
    //   method: request.method,
    //   message: exception.name! + ' ' + exception.message || null,
    // };

    const logger = new MyLogger(new FileLoggerService());
    logger.error(exception['message'], ` ${exception['stack']} ${exception['name']}`);

    let message = "";

    if (exception instanceof HttpException) {

      response.status(status).json(ApiResponse.failed(exception.message, null));

      return;
    }




    if (status === HttpStatus.UNAUTHORIZED) {
      message = ""
    }

    if (code) {
      switch (code) {
        case MongoDbErrors.DUPLICATE_KEY:
          message = "User already exists"
          break
        case MongoDbErrors.ERR_CONNECTING:
          message = "Error connecting to database"
          break
        default:
          message = "Something went wrong (database error)"
          break
      }
    }

    response.status(status).json(ApiResponse.failed(message, null));
  }
}
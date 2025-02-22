import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { responseMessage } from '../utils/response';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const message = typeof exceptionResponse === 'string'
      ? exceptionResponse
      : (exceptionResponse as any).message || exception.message;

    response.status(status).json({
      success: false,
      code: status,
      data: null,
      msg: message,
      timestamp: Date.now()
    });
  }
}

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { responseMessage } from '../utils/response';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json(
      responseMessage(null, exception.message)
    );
  }
}

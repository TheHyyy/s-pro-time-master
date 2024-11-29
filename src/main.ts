import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from '@/filter/all-exception.filter'; // 全局异常过滤器
import { HttpExceptionsFilter } from '@/filter/http-exception.filter'; // http 异常过滤器

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 错误异常捕获 和 过滤处理
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

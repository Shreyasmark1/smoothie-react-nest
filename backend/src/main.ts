import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RequestTrackingInterceptor } from './core/config/interceptors/request.interceptor';
import { HttpExceptionFilter } from './core/config/filters/exception.filter';
import { FileLoggerService } from './core/config/logging/file-logger.service';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalFilters(new HttpExceptionFilter());

  const fileLoggerService = new FileLoggerService()

  app.useGlobalInterceptors(
    new RequestTrackingInterceptor(
      fileLoggerService,
    )
  )

  app.useGlobalPipes(new ValidationPipe({
    // forbidNonWhitelisted: true,
    // whitelist: true
  }))

  await app.listen(process.env.PORT);
}
bootstrap();

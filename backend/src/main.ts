import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MyLogger } from './configuration/Logger';
import { PORT } from './utils/constants';

async function bootstrap() {

  const app = await NestFactory.create(AppModule,{
    logger: new MyLogger()
  });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT);
}
bootstrap();

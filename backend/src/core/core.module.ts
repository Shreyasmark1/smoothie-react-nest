import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './security/jwt.guard';
import { JwtStrategy } from './security/jwt.strategy';
import { FileLoggerService } from './config/logging/file-logger.service';


@Module({
  controllers: [],
  imports: [],
  providers: [
    JwtAuthGuard,
    JwtStrategy,
    FileLoggerService
  ]
})
export class CoreModule { }

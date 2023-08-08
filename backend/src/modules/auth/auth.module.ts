import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RepositoryModule } from 'src/repository/repository.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    RepositoryModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }

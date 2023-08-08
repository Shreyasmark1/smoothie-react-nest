import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RepositoryModule } from './repository/repository.module';
import configuration from './core/config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './core/security/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.env.local'],
      isGlobal: true
    }),
    JwtModule.register(
      {
        global: true,
      }
    ),
    // MongooseModule.forRoot(
    //   process.env.DATABASE_URI,
    //   {
    //     dbName: process.env.DATA_BASE
    //   }
    // )
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodbUri'),
      }),
      inject: [ConfigService],
    },
    )
    ,
    UsersModule,
    AuthModule,
    CoreModule,
    RepositoryModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    AppService,
  ],
})
export class AppModule { }

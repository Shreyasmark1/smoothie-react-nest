import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { User, UserSchema } from './schema/user.schema';
const bcrypt = require('bcrypt')

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.example'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_URI,
      {
        dbName:process.env.DATABASE
      }
    ),
    MongooseModule.forFeatureAsync([{
      name: User.name,
      useFactory: () => {
        const schema = UserSchema;
        schema.pre<User>('save',async function(next) {

          const user = this

          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(user.password,salt)

          user.password = hashPassword
          next()

        });

        return schema
      }
    }]),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

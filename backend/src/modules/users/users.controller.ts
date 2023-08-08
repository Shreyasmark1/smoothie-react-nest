import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/repository/schema/user.schema';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  signUp(@Body() req:User): Object {
    return this.usersService.createUser(req)
  }

  @Get('/login')
  login(@Req() user:User):Object{
    return this.usersService.findAll()
  }
  
}

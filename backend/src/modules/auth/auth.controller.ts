import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from 'src/model/api.response';
import { Register } from './dto/register.dto';
import { Login } from './dto/login.dto';
import { Public } from 'src/core/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("signup")
  async signUp(@Body() req: Register): Promise<ApiResponse> {

    const data = await this.authService.signUp(req)

    return ApiResponse.send(data);

  }

  @Post("login")
  async login(@Body() req: Login ): Promise<ApiResponse>{
    const data = await this.authService.login(req)
    return ApiResponse.send(data)
  }
}

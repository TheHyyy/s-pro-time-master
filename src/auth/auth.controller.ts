import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { responseMessage } from '@/utils/response';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  async register(@Body() registerDto: { username: string; password: string }) {
    const result = await this.authService.register(registerDto.username, registerDto.password);
    return responseMessage(result);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    return responseMessage(result);
  }
} 
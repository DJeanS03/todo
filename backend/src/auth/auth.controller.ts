import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { name, email, password } = body;

    const user = await this.authService.register(name, email, password);

    if (!user) {
      throw new HttpException('E-mail já cadastrado', HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'Usuário registrado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const result = await this.authService.login(email, password);

    if (!result) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    return {
      message: 'Login realizado com sucesso',
      token: result.token,
      user: result.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUsers(@Request() req: { user: any }) {
    console.log('Usuário autenticado:', req.user);

    const users = await this.authService.getAllUsers();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }));
  }
}

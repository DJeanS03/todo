import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

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
}

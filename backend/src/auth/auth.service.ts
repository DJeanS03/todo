import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Registro
  async register(name: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }

  // Login
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return null;
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
      },
      {
        expiresIn: '2h',
      },
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async deleteUser(id: number) {
    return await prisma.user.delete({
      where: { id },
    });
  }

  async updateUser(
    id: number,
    body: { name?: string; email?: string; password?: string },
  ) {
    const updateData: { name?: string; email?: string; password?: string } = {};

    if (body.name) updateData.name = body.name;
    if (body.email) updateData.email = body.email;
    if (body.password) {
      const hashed = await bcrypt.hash(body.password, 10);
      updateData.password = hashed;
    }

    return await prisma.user.update({
      where: { id },
      data: updateData,
    });
  }
}

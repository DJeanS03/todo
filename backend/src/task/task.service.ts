import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return await this.prismaService.task.create({
      data: {
        ...createTaskDto,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prismaService.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prismaService.task.findUnique({
      where: { id },
    });

    if (!task || task.userId !== userId) {
      throw new ForbiddenException('Acesso negado à task');
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const task = await this.prismaService.task.findUnique({
      where: { id },
    });

    if (!task || task.userId !== userId) {
      throw new ForbiddenException('Acesso negado à task');
    }

    return await this.prismaService.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number, userId: number) {
    const task = await this.prismaService.task.findUnique({
      where: { id },
    });

    if (!task || task.userId !== userId) {
      throw new ForbiddenException('Acesso negado à task');
    }

    return await this.prismaService.task.delete({
      where: { id },
    });
  }
}

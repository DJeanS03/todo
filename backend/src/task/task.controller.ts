import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    return this.taskService.create(createTaskDto, req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.taskService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.taskService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req,
  ) {
    return this.taskService.update(+id, updateTaskDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.taskService.remove(+id, req.user.id);
  }
}

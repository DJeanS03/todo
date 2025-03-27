import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [DbModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

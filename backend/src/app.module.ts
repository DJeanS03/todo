import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [DbModule, TaskModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

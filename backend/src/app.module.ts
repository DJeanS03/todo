import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
//import { DbModule } from './db/db.module';
//import { TaskModule } from './task/task.module';

@Module({
  /* imports: [DbModule, TaskModule],
  controllers: [],
  providers: [], */

  imports: [AuthModule],
})
export class AppModule {}

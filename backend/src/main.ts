import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['https://todo-omega-three-89.vercel.app/'],
      credentials: true,
    },
  });

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();

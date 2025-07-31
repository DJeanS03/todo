import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  dotenv.config(); // carrega .env
  const app = await NestFactory.create(AppModule);

  // CORS com origem configurável
  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN || '*',
    credentials: true, // se precisar enviar cookies/autenticação
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});

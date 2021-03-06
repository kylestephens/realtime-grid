import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const allowedOrigins = [
    'http://localhost:4200'
  ];

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: allowedOrigins
    }
  });

  await app.listen(3000);
}
bootstrap();

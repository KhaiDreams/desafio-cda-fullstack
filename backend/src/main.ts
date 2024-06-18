import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

dotenv.config();

const allowedOrigins = ['http://localhost:3000'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()).use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    }),
  );

  await app.listen(process.env.PORT || 8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

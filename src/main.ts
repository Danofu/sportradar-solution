import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/app.module';

const PORT = parseInt(process.env.PORT) || 3000;
const logger = new Logger('bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => logger.log(`Application started at port: ${PORT}`));
}
bootstrap();

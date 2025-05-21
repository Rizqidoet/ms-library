import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger
  const setupSwagger = new DocumentBuilder()
  .setTitle('MS-Library')
  .setDescription('API Documentation for ms-libarary')
  .setVersion('1.0')
  .addTag('Catalogue', 'Module Catalogue')
  .build();
  const document = SwaggerModule.createDocument(app, setupSwagger);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

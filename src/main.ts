import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.static('.')); //dinh vi tai nguyen (file anh hoac video)

  const config = new DocumentBuilder()
    .setTitle('Products')
    .addBearerAuth()
    .setDescription('Mai Trung Description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  await app.listen(3000);
}
bootstrap();

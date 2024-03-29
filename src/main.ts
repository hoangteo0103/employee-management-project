import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  const config = new DocumentBuilder()
    .addCookieAuth('jwt')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('admin-asset-related')
    .addTag('admin-employee-related')
    .addTag('admin-attendance-related')
    .addTag('admin-leave-related')
    .addTag('admin')
    .addTag('employee')
    .addTag('manager')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  const port: number = configService.getOrThrow<number>('PORT');
  const config = new DocumentBuilder()
    .setTitle('Car manager')
    .setDescription('Build car manager with NestJS and Prisma')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Starting server on http://localhost:${port}/api`);
}
bootstrap();

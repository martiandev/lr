import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Last Resort')
    .setDescription('Last Resort API')
    .setVersion('1.0')
    .addTag('Last Resort')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app,swaggerConfig);
  SwaggerModule.setup('api',app,document);
  await app.listen(3001);
}
bootstrap();

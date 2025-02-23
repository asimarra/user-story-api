import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@shared/infrastructure/exception-filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: {
  hot: { accept: () => void; dispose: (callback: () => void) => void };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // General configuration
  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalFilters(new HttpExceptionFilter(logger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Invoice Management')
    .setDescription('API documentation for the Invoice Management application')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  // Start application
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`App running on port ${process.env.PORT}`);

  // Hot Reload for Development
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      app.close().catch(console.error);
    });
  }
}

bootstrap().catch(console.error);

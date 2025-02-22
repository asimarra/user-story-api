import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@shared/exception-filters/http-exception.filter';

declare const module: {
  hot: { accept: () => void; dispose: (callback: () => void) => void };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalFilters(new HttpExceptionFilter(logger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

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

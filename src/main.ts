import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AccessTokenGuard } from './utils/guard/accessToken.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const reflector = new Reflector();
  app.useGlobalGuards(new AccessTokenGuard(reflector));
  process.env.ENVIRONMENT === 'development'
    ? await app.listen(process.env.PORT)
    : await app.listen(process.env.PORT || 8080, '0.0.0.0');
  console.log('Express server listening on port %d', process.env.PORT || 8080);
  console.log(process.env.ENVIRONMENT);
  console.log(await app.getUrl());
  console.log(await app.getHttpServer().address());
}
bootstrap();

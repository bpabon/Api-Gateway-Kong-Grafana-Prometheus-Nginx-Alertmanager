import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  // Solo aplica JWT y el prefijo /api a las rutas que deben ser protegidas
   app.setGlobalPrefix('api', {
    exclude: [
      { path: 'public/login', method: RequestMethod.POST }, 
      { path: 'public/register', method: RequestMethod.POST },
      {path: 'public/health', method: RequestMethod.GET},
      {path: 'public/hello', method: RequestMethod.GET},
      {path: 'public/token', method: RequestMethod.POST}
    ]
  });
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
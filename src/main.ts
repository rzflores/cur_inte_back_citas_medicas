import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const logger = new Logger('INIT');
  app.setGlobalPrefix('v1/api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true,
      forbidNonWhitelisted: true
    })
  )
  // Configuración de opciones CORS
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200', // Permite solicitudes desde este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };

  // Habilitar CORS
  app.enableCors(corsOptions);

  await app.listen(3000);
  logger.log('proyecto iniciado')
}
bootstrap();

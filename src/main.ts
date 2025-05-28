import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //agrega un prefijo a la ruta 
  app.setGlobalPrefix('api/v1')

  // valida las peticiones, los parametros de las peticiones
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // que esten en una lista blanca
      forbidNonWhitelisted: true,
      transform: true, // transforma los parametros si le es posible
    }),
  )
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //agrega un prefijo a la ruta
  app.setGlobalPrefix('api/v1');

  // valida las peticiones, los parametros de las peticiones
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // que esten en una lista blanca
      forbidNonWhitelisted: true,
      transform: true, // transforma los parametros si le es posible
    }),
  );

  // para agregar la documentacion de la api

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

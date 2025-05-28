import { Module } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedController } from './breed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Breed])], // importamos el modulo de typeorm /// pasamos las entidades dentro del forFeature
  controllers: [BreedController],
  providers: [BreedService],
  exports: [TypeOrmModule], // exportamos el servicio para que pueda ser usado en otros modulos
})
export class BreedModule {}

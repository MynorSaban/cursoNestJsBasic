import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { BreedService } from '../breed/breed.service';
import { BreedModule } from '../breed/breed.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), BreedModule], // importamos el modulo de typeorm /// pasamos las entidades dentro del forFeature
  controllers: [CatsController],
  providers: [CatsService, BreedService],
})
export class CatsModule {} 
 
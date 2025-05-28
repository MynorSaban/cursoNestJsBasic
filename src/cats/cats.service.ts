import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breed/entities/breed.entity';

@Injectable()
export class CatsService {
  //para poder acceder a los metodos que tiene por defecto entonces se tiene que crear un constructor
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,

    /// se importa la otra entidad para hacer la relacion con la otra entidad
    // en la inyeccion se debe de 
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    //const cat = this.catsRepository.create(createCatDto);   // puedo instanciar asi tambein
    // await this.catsRepository.save(cat);  // TAMBIEN SE CREA LA INSTANCIA DEL GATO
    // return await this.catsRepository.save(createCatDto);


    const breed = await this.breedRepository.findOneBy({
      name: createCatDto.breed,
    });
    if (!breed) {
      throw new BadRequestException('Breed not found');
    }
   
    return await this.catsRepository.save({
      ...createCatDto,
      breed: breed, // se le asigna la propiedad breed a la entidad cat
    });
  }

  async findAll() {
    // Este retornara todo lo que tenga la tabla
    return await this.catsRepository.find();
  }

  async findOne(id: number) {
    return await this.catsRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    //return await this.catsRepository.update(id, updateCatDto); // update es para actualizar un registro
    return;
  }

  async remove(id: number) {
    return await this.catsRepository.softDelete(id); // SOFT DELETE ELIMINA EL REGISTRO PERO NO ELIMINA EL REGISTRO DE LA BASE DE DATOS
    // return await this.catsRepository.softRemove(id) // SOFT DELETE ELIMINA EL REGISTRO DE LA BASE DE DATOS
  }
}

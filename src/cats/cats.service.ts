import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breed/entities/breed.entity';
import { UserActivateInterface } from 'src/interfaces/user-activate.interface';
import { Role } from 'src/common/enums/rol.enum';

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
    const cat = await this.catsRepository.findOneBy({ id });
    if (!cat) {
      throw new BadRequestException('Cat not found');
    }
    return cat;
  
  }

  async update(
    id: number,
    updateCatDto: UpdateCatDto,
    user: UserActivateInterface,
  ) {
    await this.findOne(id);
    return await this.catsRepository.update(id, {
      ...updateCatDto,
      breed:  updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
    });
  }

  async remove(id: number) {
    return await this.catsRepository.softDelete(id); // SOFT DELETE ELIMINA EL REGISTRO PERO NO ELIMINA EL REGISTRO DE LA BASE DE DATOS
    // return await this.catsRepository.softRemove(id) // SOFT DELETE ELIMINA EL REGISTRO DE LA BASE DE DATOS
  }
  private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });
  
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
    return breedEntity;
  }

}

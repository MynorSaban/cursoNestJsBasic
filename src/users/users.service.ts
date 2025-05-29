import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.userRepository.save(createUserDto);
    return {
      message: 'User created successfully',
    };
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  //consulta personalizada en SQL por medio del ORM
  async findOneByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'role', 'email', 'password'],
    });
  }

  async remove(id: number) {
    return await this.userRepository.softDelete({ id });
  }
  
  async findAll() {
    return await this.userRepository.find();
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  //se llama a los servicios de users para poder hacer uso de sus metodos
  //el constructor puede tener mas de una inyeccion
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    //verificamos si existe el usuario en la base de datos
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('El email es incorrecto');
    }

    const isPasswordValid = await bcryptjs.compare(
      loginDto.password, // la que envio el usuario
      user.password, // la que esta en la base de datos
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña es incorrecta');
    }

    const payload = {
      email: user.email,
      role: user.role
    };

    //creacion del token
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      payload,
    };
  }
  async register(registerDto: RegisterDto) {
    //verificamos si existe el usuario en la base de datos
    const user = await this.usersService.findOneByEmail(registerDto.email);

    if (user) {
      throw new BadRequestException('El usuario ya existe');
    }

    return await this.usersService.create({
      ...registerDto,
      password: await bcryptjs.hash(registerDto.password, 10),
    });
  }
}

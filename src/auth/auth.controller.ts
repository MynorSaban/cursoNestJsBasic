import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';



//se crea un tipado para la devolucion de la informacion del request

interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
}

//este es una ruta que se agrega para poder usar este controlador
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //para agregar la ruta para el login se debe de poner que tipo sera y la ruta, con su respectivo metodo debajo
  @Post('login')
  login(
    @Body() // los datos que se envian en el body
    loginDto: LoginDto, // los datos de tipo registerDto con sus respectivas validaciones con el validator
  ) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(
    @Body() // los datos que se envian en el body
    registerDto: RegisterDto, // los datos de tipo registerDto con sus respectivas validaciones con el validator
  ) {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard) // esto es para que realice la validacion si tiene el token o no
  profile(
    @Req // mando a llamar esto para acceder a la informacion del request
      () // mando a llamar esto para acceder a la informacion del request
    request: RequestWithUser,
  ) {
    return request.user;
  }
}

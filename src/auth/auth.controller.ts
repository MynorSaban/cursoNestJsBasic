import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { RolesArray } from './decorators/rolesArray.decorator';
import { RolesGuardArray } from './guard/rolesArray.guard';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from './decorators/active-user.decorator';
import { UserActivateInterface } from 'src/interfaces/user-activate.interface';

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

  //RUTA CON ROLES
  @Get('profile')
  @Roles(Role.ADMIN) // solo acceso a admin
  @UseGuards(AuthGuard, RolesGuard) // esto es para que realice la validacion si tiene el token o no // ademas se debe de agregar el guard de las rutas
  profile(
    @Req() // mando a llamar esto para acceder a la informacion del request // mando a llamar esto para acceder a la informacion del request
    request: RequestWithUser,
  ) {
    return this.authService.profileNormal(request.user);
  }

  //RUTA CON ROLES y el decorador ACTIVATE
  @Get('activate')
  @Roles(Role.USER) // solo acceso a admin
  @UseGuards(AuthGuard, RolesGuard) // esto es para que realice la validacion si tiene el token o no // ademas se debe de agregar el guard de las rutas
  activate(@ActiveUser() user: UserActivateInterface) {
    return this.authService.profileActive(user);
  }

  //RUTA CON ROLES ARRAY

  @Get('profile3')
  @RolesArray([Role.ADMIN, Role.USER]) // acceso a admin y user
  @UseGuards(AuthGuard, RolesGuardArray) // esto es para que realice la validacion si tiene el token o no // ademas se debe de agregar el guard de las rutas
  profile3(
    @Req() // mando a llamar esto para acceder a la informacion del request // mando a llamar esto para acceder a la informacion del request
    request: RequestWithUser,
  ) {
    return this.authService.profileNormal(request.user);
  }

  //RUTA CON ROLES USANDO UN UNICO DECORADOR
  @Get('profile4')
  @Auth(Role.USER) // solo acceso a admin
  profile4(
    @Req() // mando a llamar esto para acceder a la informacion del request // mando a llamar esto para acceder a la informacion del request
    request: RequestWithUser,
  ) {
    return this.authService.profileNormal(request.user);
  }

  //RUTA SIN ROLES
  @Get('profile2')
  @UseGuards(AuthGuard, RolesGuard) // esto es para que realice la validacion si tiene el token o no // ademas se debe de agregar el guard de las rutas
  profile2(
    @Req() // mando a llamar esto para acceder a la informacion del request // mando a llamar esto para acceder a la informacion del request
    request: RequestWithUser,
  ) {
    return this.authService.profileNormal(request.user);
  }
}

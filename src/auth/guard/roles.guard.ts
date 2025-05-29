import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

export interface Roles {
  role: string;
}

@Injectable()
export class RolesGuard implements CanActivate {
  //llamamos a la clase Reflector para poder usar el decorador @Roles
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //SI LA RUTA NO NECESITA ROLES, DEVOLVEMOS TRUE
    if (!role) {
      return true;
    }

    console.log(role);

    //obtiene la información del usuario del request// accede directo al objeto user del request
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    if (role === 'admin') {
      return true;
    }

    return role === user.role;
  }
}

export class RolesGuardArray implements CanActivate {
  //llamamos a la clase Reflector para poder usar el decorador @Roles
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Roles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log(role);

    //SI LA RUTA NO NECESITA ROLES, DEVOLVEMOS TRUE
    if (!role) {
      return true;
    }

    //obtiene la información del usuario del request// accede directo al objeto user del request
    const { user } = context.switchToHttp().getRequest();
    console.log(user);

    return role === user.role;
  }
}

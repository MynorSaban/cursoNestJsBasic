import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/rol.enum';

@Injectable()
export class RolesGuardArray implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    console.log('requiredRoles', requiredRoles);
    // Si no se asignan roles, dejamos pasar
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roles = user.role.split(',');
    // Compara los roles del usuario con los roles requeridos
    try {
      const hasRole = roles.some((role) => requiredRoles.includes(role));

      if (!hasRole) {
        throw new ForbiddenException(
          'Access denied. User does not have required role.',
        );
      }
    } catch (error) {
      console.log('error', error);
    }

    return true;
  }
}

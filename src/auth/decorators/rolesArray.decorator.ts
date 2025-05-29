import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '../../common/enums/rol.enum';


//este es un middleware para los permisos a rutas en especifico para la validacion de roles segun las rutas predeterminadas
export const RolesArray = (roles: Role[]) => SetMetadata(ROLES_KEY, roles);
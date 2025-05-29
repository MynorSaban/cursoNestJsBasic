import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/enums/rol.enum';

export const ROLES_KEY = 'roles';

//este es un middleware para los permisos a rutas en especifico para la validacion de roles segun las rutas predeterminadas
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);

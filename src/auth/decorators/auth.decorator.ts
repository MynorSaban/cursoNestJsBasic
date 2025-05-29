import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export function Auth(role: Role){
    return applyDecorators(
      Roles(role), // hacemos el llamado a la funcion Roles
      UseGuards(AuthGuard, RolesGuard), // hacemos el llamado a la funcion de Guards
        
    );
}

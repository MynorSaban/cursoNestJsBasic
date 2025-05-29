import { ExecutionContext, createParamDecorator } from "@nestjs/common";


// para filtrar solo lo que le pertenece a este usuario
export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);



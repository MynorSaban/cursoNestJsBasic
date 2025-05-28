import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateCatDto {
  // aqui va a mapear la informacion para poder llegar a la base de datos
  @IsString()
  @MinLength(1)
  name: string;
  @IsInt()
  @IsPositive()
  age: number;
  @IsString()
  @IsOptional()
  breed?: string;
}
import { IsString, MinLength } from "class-validator";

export class CreateBreedDto {
    // aqui va a mapear la informacion para poder llegar a la base de datos
    @IsString()
    @MinLength(3)
    name: string;  
}

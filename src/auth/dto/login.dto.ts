import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
  @Transform(({ value }) => value.trim()) // quita los espacios en blanco
  @IsString()
  @MinLength(6)
  password: string;
}

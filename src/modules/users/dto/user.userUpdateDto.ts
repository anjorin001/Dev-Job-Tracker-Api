import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  career?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bio?: string;
}

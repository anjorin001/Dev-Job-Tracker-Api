import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from "class-validator";

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @MaxLength(20)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;
}

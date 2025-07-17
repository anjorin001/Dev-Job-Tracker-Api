import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  maxLength,
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

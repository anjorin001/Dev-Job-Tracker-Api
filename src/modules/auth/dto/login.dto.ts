import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator';
export class LoginDto{
    @IsEmail()
    email!: string

    @IsString()
     @IsNotEmpty()
     @IsStrongPassword()
     @MaxLength(20)
    password!:string
}
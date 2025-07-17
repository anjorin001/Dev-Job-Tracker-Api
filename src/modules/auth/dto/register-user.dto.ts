import {IsEmail, IsString, MaxLength } from "class-validator";

export class RegisterDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

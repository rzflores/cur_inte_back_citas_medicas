import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
    @IsNotEmpty({ message: 'Email es requerido' })
    @IsEmail({},{ message: 'Email no cumple el formato' })
    email:string;
    @IsNotEmpty({ message: 'Contraseña es requerido' })
    @IsString({ message: 'Debe ser una cadena' })
    contrasenia: string;
}

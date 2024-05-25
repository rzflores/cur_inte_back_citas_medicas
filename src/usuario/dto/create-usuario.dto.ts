import { IsEmail, IsNumber, IsPhoneNumber, IsString, IsStrongPassword, IsUUID, MinLength  } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @MinLength(3, { message: 'Nombres: Minimo 3 letras' })
    nombre: string;
    @IsString()
    @MinLength(3, { message: 'Apellidos: Minimo 3 letras' })
    apellido : string;
    @IsString()
    @IsEmail({ } , { message: 'Email: No cumple el formato de correo' })
    email: string;
    @IsStrongPassword( { minUppercase : 1 ,  minLength : 6 , minSymbols : 1  } , { message : 'Contraseña: 1 letra mayúscula,mínimo 6 letras y un simbolo' })
    contrasenia: string;
    @IsPhoneNumber("PE")
    @MinLength(9, { message: 'Celular: formato invalido' })
    celular: string;
    @IsUUID()
    id_rol : string;
    @IsString()    
    @MinLength(8, { message: 'Numero de documento: Minimo 8 caracteres' })
    numero_documento: string;
    @IsString()
    tipo_documento:string;
}

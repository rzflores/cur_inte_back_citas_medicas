import { IsEmail, IsEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, IsUUID, MinLength  } from "class-validator";
import { v3 } from "uuid";

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
    @IsOptional()
    @IsPhoneNumber("PE" , { message: 'Celular: formato invalido' })
    @MinLength(9, { message: 'Celular: formato invalido' })
    celular: string;
    @IsUUID()
    id_rol : string;
    @IsString()    
    @MinLength(8, { message: 'Numero de documento: Minimo 8 caracteres' })
    numero_documento: string;
    @IsString()
    tipo_documento:string;
    // ----------crear doctor
    @IsOptional()
    @IsNumber()
    anios_experiencia: number;

    @IsOptional()
    @IsString()
    codigo_colegio : string;

    @IsOptional()
    @IsUUID( "all",{ message: "Especialidad requerida" })
    id_especialidad: string;
    // ----------crear paciente

}

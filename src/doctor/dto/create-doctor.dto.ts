import { IsEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateDoctorDto {

    @IsNumber({},{message: "Años de exp: formato invalido"})
    anios_experiencia: number;
  
    @IsString({ message : "Codigo colegio: formato invalido" })
    codigo_colegio : string;

    @IsUUID()
    id_especialidad: string;

    @IsUUID()
    id_usuario: string;

    @IsString()
    @IsOptional()
    ids_disponibilidad : string = ""
}

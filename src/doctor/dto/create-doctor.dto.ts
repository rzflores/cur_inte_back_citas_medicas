import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateDoctorDto {

    @IsNumber()
    anios_experiencia: number;
  
    @IsString()
    codigo_colegio : string;

    @IsUUID()
    id_especialidad: string;

    @IsUUID()
    id_usuario: string;
}

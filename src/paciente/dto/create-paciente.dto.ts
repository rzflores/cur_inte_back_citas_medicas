import { IsDateString, IsOptional, IsPhoneNumber, IsString, IsUUID } from "class-validator";

export class CreatePacienteDto {

    @IsOptional()
    @IsDateString()
    fecha_nacimiento: Date;
    @IsOptional()
    @IsString()
    direccion: string;
    @IsOptional()
    @IsString()
    contacto_emergencia: string;
    @IsOptional()
    @IsPhoneNumber('PE')
    celular_contacto_emergencia: string;
    @IsOptional()
    @IsString()
    historial_medico: string;
    @IsUUID()
    id_usuario: string;
}

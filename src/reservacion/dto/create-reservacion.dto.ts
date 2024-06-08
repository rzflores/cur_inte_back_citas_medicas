import { IsString, IsUUID } from "class-validator";

export class CreateReservacionDto {
    @IsUUID('all',{message:"Paciente es obligatorio"})
    id_paciente: string;
  
    @IsUUID('all',{message:"Paciente es obligatorio"})
    id_doctor: string;
  
    @IsUUID('all',{message:"Paciente es obligatorio"})
    id_consultorio: string;
    
    @IsString()
    fecha_hora: string;
    
}

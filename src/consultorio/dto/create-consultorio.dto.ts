import { IsString, IsUUID } from "class-validator";

export class CreateConsultorioDto {
  @IsString()  
  nombre_consultorio: string;
  @IsString()
  ubicacion: string;
  @IsUUID()
  id_doctor: string;
}

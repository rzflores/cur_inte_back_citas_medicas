import { IsString, IsUUID } from "class-validator";

export class CreateConsultorioDto {
  @IsString({ message: "Ubicacion: es obligatorio" })
  ubicacion: string;
  @IsUUID('all',{ message : "Doctor es obligatorio"})
  id_doctor: string;
  @IsUUID('all',{ message: "Especialidad es obligatorio" })
  id_especialidad: string;
}

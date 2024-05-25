import { IsString } from "class-validator";

export class CreateEspecialidadDto {
        @IsString()
        nombre_especialidad:string
}

import { IsString , IsDecimal } from "class-validator";

export class CreateEspecialidadDto {
        @IsString()
        nombre_especialidad:string
        @IsDecimal({ } , { message : 'Precio: Formato invalido' })
        precio_especialidad:string
}

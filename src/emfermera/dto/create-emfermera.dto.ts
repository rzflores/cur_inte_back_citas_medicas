import { IsString } from "class-validator";

export class CreateEmfermeraDto {

    @IsString({ message: "Nombres: formato invalido"})
    nombres: string;
  
    @IsString({ message : "Apellidos: formato invalido" })
    apellidos : string;

}

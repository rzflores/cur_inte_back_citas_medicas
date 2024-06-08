import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecialidadDto } from './create-especialidad.dto';
import { IsBoolean } from 'class-validator';

export class UpdateEspecialidadDto extends PartialType(CreateEspecialidadDto) {
    @IsBoolean()
    es_activo : boolean;
}

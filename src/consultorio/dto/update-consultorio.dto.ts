import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultorioDto } from './create-consultorio.dto';
import { IsBoolean } from 'class-validator';

export class UpdateConsultorioDto extends PartialType(CreateConsultorioDto) {
    @IsBoolean()
    es_activo : boolean;
}

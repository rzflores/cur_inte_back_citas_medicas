import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
import { IsBoolean } from 'class-validator';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
    @IsBoolean()
    es_activo : boolean;
}

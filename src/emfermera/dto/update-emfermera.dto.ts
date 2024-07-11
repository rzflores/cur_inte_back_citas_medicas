import { PartialType } from '@nestjs/mapped-types';
import { CreateEmfermeraDto } from './create-emfermera.dto';

export class UpdateEmfermeraDto extends PartialType(CreateEmfermeraDto) {}

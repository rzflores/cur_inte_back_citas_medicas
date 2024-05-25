import { PartialType } from '@nestjs/mapped-types';
import { CreateReservacionDto } from './create-reservacion.dto';

export class UpdateReservacionDto extends PartialType(CreateReservacionDto) {}

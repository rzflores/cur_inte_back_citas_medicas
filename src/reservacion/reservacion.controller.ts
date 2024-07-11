import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservacionService } from './reservacion.service';
import { CreateReservacionDto } from './dto/create-reservacion.dto';
import { UpdateReservacionDto } from './dto/update-reservacion.dto';

@Controller('reservacion')
export class ReservacionController {
  constructor(private readonly reservacionService: ReservacionService) {}

  @Post()
  create(@Body() createReservacionDto: CreateReservacionDto) {
    return this.reservacionService.create(createReservacionDto);
  }

  @Get()
  findAll() {
    return this.reservacionService.findAll();
  }

  @Post('/filter/:id')
  findAllFilter(@Param('id') id: string) {
    return this.reservacionService.findAllFilter(id);
  }

  @Post('/paciente/:id')
  findAllReservacionPorDoctorlFilter(@Param('id') id: string) {
    return this.reservacionService.findReservacionPorPaciente(id);
  }

  @Post('/changeState/:id')
  changeStateReservacion(@Param('id') id: string) {
    return this.reservacionService.updateState(id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservacionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservacionDto: UpdateReservacionDto) {
    return this.reservacionService.update(+id, updateReservacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservacionService.remove(+id);
  }
}

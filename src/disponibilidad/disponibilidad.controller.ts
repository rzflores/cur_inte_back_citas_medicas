import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisponibilidadService } from './disponibilidad.service';

@Controller('disponibilidad')
export class DisponibilidadController {
  constructor(private readonly disponibilidadService: DisponibilidadService) {}

  

  @Get()
  findAll() {
    return this.disponibilidadService.findAll();
  }


  @Post("/doctor/:id")
  findByDoctor(@Param('id') id: string) {
    return this.disponibilidadService.findByDoctor(id);
  }
  

 
}

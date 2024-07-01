import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { RegistrarPacienteDto } from './dto/create-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  create(@Body() registrarPacienteDto: RegistrarPacienteDto) {
    return this.mailService.registroPaciente(registrarPacienteDto);
  }

  
}

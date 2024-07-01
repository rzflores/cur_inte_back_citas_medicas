import { Injectable } from '@nestjs/common';
import { RegistrarPacienteDto } from './dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Injectable()
export class MailService {

  constructor(private readonly mailerService: MailerService) {
    
  }

  async registroPaciente(registrarPacienteDto: RegistrarPacienteDto) {
    try {

      let context = { 
        nombreCompleto : registrarPacienteDto.nombreCompleto,
        email : registrarPacienteDto.correo,
        contrasenia : registrarPacienteDto.contrasenia
       }
       console.log(context)
      await this.mailerService.sendMail({
        to: registrarPacienteDto.correo,
        subject: 'Registro CitasWeb',
        template: './register', 
        context: context,
      });  
    } catch (error) {
        console.log(error)
    }
  }
  recuperarContrasenia() {
    return `This action returns all mail`;
  }
}

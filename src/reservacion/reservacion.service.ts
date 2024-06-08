import { Injectable } from '@nestjs/common';
import { CreateReservacionDto } from './dto/create-reservacion.dto';
import { UpdateReservacionDto } from './dto/update-reservacion.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservacion } from './entities/reservacion.entity';
import { ConsultorioService } from 'src/consultorio/consultorio.service';
import { PacienteService } from 'src/paciente/paciente.service';

@Injectable()
export class ReservacionService {

  constructor(
    @InjectRepository(Reservacion)
    private readonly reservacionRepository : Repository<Reservacion>,
    private readonly consultorioService : ConsultorioService,
    private readonly pacienteService : PacienteService,

  ) {
    
    
  }

  async create(createReservacionDto: CreateReservacionDto) {
    
    let newRerservacion = new Reservacion();
    let consultorio = await this.consultorioService.findOne(createReservacionDto.id_consultorio);
    let paciente = await this.pacienteService.findOne(createReservacionDto.id_paciente)
    newRerservacion.consultorio = consultorio;
    newRerservacion.paciente = paciente;
    newRerservacion.doctor = consultorio.doctor;
    newRerservacion.estado = 'pendiente';
    newRerservacion.fecha_hora = new Date(createReservacionDto.fecha_hora);

    const reservacionGrabar = await this.reservacionRepository.create(newRerservacion);
    return await this.reservacionRepository.save(reservacionGrabar);
  }

  async findAll() {
    
  }

  async findOne(id: number) {
    
  }

  async update(id: number, updateReservacionDto: UpdateReservacionDto) {
    
  }

  async remove(id: number) {
    await this.reservacionRepository.delete(id);
  }
}

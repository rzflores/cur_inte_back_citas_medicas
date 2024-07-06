import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateReservacionDto } from './dto/create-reservacion.dto';
import { UpdateReservacionDto } from './dto/update-reservacion.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservacion } from './entities/reservacion.entity';
import { ConsultorioService } from 'src/consultorio/consultorio.service';
import { PacienteService } from 'src/paciente/paciente.service';
import { DisponibilidadService } from 'src/disponibilidad/disponibilidad.service';
import { DoctorService } from 'src/doctor/doctor.service';

@Injectable()
export class ReservacionService {

  constructor(
    @InjectRepository(Reservacion)
    private readonly reservacionRepository : Repository<Reservacion>,
    
    private readonly consultorioService : ConsultorioService,
    private readonly pacienteService : PacienteService,
    private readonly disponibilidadService : DisponibilidadService,

   

  ) {
    
    
  }

  async create(createReservacionDto: CreateReservacionDto) {
    
    let newRerservacion = new Reservacion();
    let consultorio = await this.consultorioService.findOne(createReservacionDto.id_consultorio);
    let paciente = await this.pacienteService.findOne(createReservacionDto.id_paciente)
    let disponibilidad = await this.disponibilidadService.findOne(createReservacionDto.id_disponibilidad)
    console.log(consultorio)
    newRerservacion.consultorio = consultorio;
    newRerservacion.paciente = paciente;
    newRerservacion.doctor = consultorio.doctor;
    newRerservacion.disponibilidad = disponibilidad;
    // newRerservacion.estado = 'pendiente';
    newRerservacion.fecha =createReservacionDto.fecha;

    const reservacionGrabar = await this.reservacionRepository.create(newRerservacion);
    return await this.reservacionRepository.save(reservacionGrabar);
  }

  async findAll() {
    return this.reservacionRepository.find( { relations : { consultorio : true , doctor : true , paciente : true } } )
  }

  async findOne(id: number) {
    
  }

  async findReservacionPorDoctor(idDoctor: string) {
    return this.reservacionRepository.find( { where: { doctor : { ID_doctor : idDoctor } }  , relations: { disponibilidad: true } } )
  }


  async findReservacionPorMultipleDisponibilidad(idsDisponibilidad: string[]) {
    return this.reservacionRepository.exists( { where: { disponibilidad : { ID_disponibilidad : In(idsDisponibilidad)  } } } )
  }

  async update(id: number, updateReservacionDto: UpdateReservacionDto) {
    
  }

  async remove(id: number) {
    await this.reservacionRepository.delete(id);
  }
}

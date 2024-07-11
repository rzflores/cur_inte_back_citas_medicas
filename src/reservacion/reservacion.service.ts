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
import { Usuario } from 'src/usuario/entities/usuario.entity';

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
    newRerservacion.fecha =createReservacionDto.fecha;

    const reservacionGrabar = await this.reservacionRepository.create(newRerservacion);
    return await this.reservacionRepository.save(reservacionGrabar);
  }

  async findAll() {
    return this.reservacionRepository.find( { relations : { consultorio : true , doctor : true , paciente : { usuario : true } , disponibilidad : true } } )
  }

  async findAllFilter( uuid : string) {
    if(uuid === "all"){
      return this.reservacionRepository.find( { relations : { consultorio : true , doctor :  { usuario : true } , paciente : { usuario : true } , disponibilidad : true } } )
    }else{
      return this.reservacionRepository.find( 
                { 
                  relations : { consultorio : true , doctor : { usuario : true } , paciente : { usuario : true } , disponibilidad : true }, 
                  where : { doctor: { usuario : { ID_usuario : uuid } } }
                })
    }

  }

  async findOne(id: string) {
    return this.reservacionRepository.findOne( { where : {  ID_reservacion : id } } )
  }

  async findReservacionPorDoctor(idDoctor: string) {
    return this.reservacionRepository.find( { where: { doctor : { ID_doctor : idDoctor } }  , relations: { disponibilidad: true } } )
  }

  async findReservacionPorPaciente(idPaciente: string) {
    return this.reservacionRepository.find( { where: { paciente : { ID_paciente : idPaciente } }  , 
                                              relations: { disponibilidad: true , paciente : {  usuario : true  } , doctor : { especialidad: true , usuario : true } } } )
  }


  async findReservacionPorMultipleDisponibilidad(idsDisponibilidad: string[]) {
    return this.reservacionRepository.exists( { where: { disponibilidad : { ID_disponibilidad : In(idsDisponibilidad)  } } } )
  }

  async update(id: number, updateReservacionDto: UpdateReservacionDto) {
    
  }

  async updateState(id: string) {
    let reservacion = await this.findOne(id);
    reservacion.estado = 1;
    await this.reservacionRepository.save(reservacion)  
  }


  async remove(id: number) {
    await this.reservacionRepository.delete(id);
  }
}

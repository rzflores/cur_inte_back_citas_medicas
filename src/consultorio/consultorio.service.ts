import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultorioDto } from './dto/create-consultorio.dto';
import { UpdateConsultorioDto } from './dto/update-consultorio.dto';
import { Consultorio } from './entities/consultorio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EspecialidadService } from 'src/especialidad/especialidad.service';
import { DoctorService } from 'src/doctor/doctor.service';

@Injectable()
export class ConsultorioService {
  constructor(
    @InjectRepository(Consultorio)
    private readonly consultorioRepository : Repository<Consultorio>,
    private readonly especialidadService : EspecialidadService,
    private readonly doctorService : DoctorService,

  ){}

  async create(createConsultorioDto: CreateConsultorioDto) {


      const doctor = await this.doctorService.findOne(createConsultorioDto.id_doctor);
      if(!doctor){
        return new NotFoundException("No existe doctor");
      }

      const especialidad = await this.especialidadService.findOne(doctor.especialidad.ID_especialidad);
      if(!especialidad){
        return new NotFoundException("No existe especialidad");
      }

      

      const usuario = this.consultorioRepository.create({
        ...createConsultorioDto,
        especialidad : especialidad,
        doctor : doctor
      });



      const consultorioNuevo = await  this.consultorioRepository.save(usuario)
      return consultorioNuevo;
  }

  async findAll() {

    let consultorios = await this.consultorioRepository.find({ relations : { especialidad : true , doctor: true } })

    return consultorios.map( consultorio => ({
      ...consultorio,
      especialidad : consultorio.especialidad,
      doctor : consultorio.doctor,
    }) ) ;
  }  
  

  async findOne(id: string) {
    const consultorio = await this.consultorioRepository.findOne(
      { 
       where : { ID_consultorio : id  }, 
       relations : { especialidad : true , doctor: true }
     } );
 
     if (!consultorio) {
       throw new NotFoundException('Usuario no encontrado');
     }
     return consultorio;
  }

  async update(id: string, updateConsultorioDto: UpdateConsultorioDto) {
    const consultorio = await this.findOne(id);
    if (!consultorio) {
      throw new NotFoundException('Usuario no encontrado');
    }
    
    Object.assign( consultorio , updateConsultorioDto);


    if(updateConsultorioDto.id_doctor){
      const doctor = await this.doctorService.findOne(updateConsultorioDto.id_doctor);
      if(!doctor){
        return new NotFoundException("No existe rol");
      }
      consultorio.doctor.ID_doctor = updateConsultorioDto.id_doctor;
      const especialidad = await this.especialidadService.findOne(doctor.especialidad.ID_especialidad);
      consultorio.especialidad.ID_especialidad = especialidad.ID_especialidad;
    }
    await this.consultorioRepository.save(consultorio);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const consultorio = await this.findOne(id);
    if (!consultorio) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.consultorioRepository.delete(id);
  }
}

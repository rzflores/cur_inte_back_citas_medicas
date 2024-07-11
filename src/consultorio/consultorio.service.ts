import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultorioDto } from './dto/create-consultorio.dto';
import { UpdateConsultorioDto } from './dto/update-consultorio.dto';
import { Consultorio } from './entities/consultorio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EspecialidadService } from 'src/especialidad/especialidad.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { EmfermeraService } from '../emfermera/emfermera.service';

@Injectable()
export class ConsultorioService {
  constructor(
    @InjectRepository(Consultorio)
    private readonly consultorioRepository : Repository<Consultorio>,
    private readonly especialidadService : EspecialidadService,
    private readonly emfermeraService : EmfermeraService,
    @Inject(forwardRef(() => DoctorService))
    private readonly doctorService : DoctorService,

  ){}

  async create(createConsultorioDto: CreateConsultorioDto) {
    let consultorioUbicacionExiste = await this.consultorioRepository.exists({
      where: { ubicacion : createConsultorioDto.ubicacion , es_eliminado : false }
    })  
    if(consultorioUbicacionExiste){
      return new NotFoundException("Ubicacion ya existe");
    }

    const emfermera = await this.emfermeraService.findOne(createConsultorioDto.id_emfermera);

    if(!emfermera){
      return new NotFoundException("No existe emfermera");
    }

    const doctor = await this.doctorService.findOne(createConsultorioDto.id_doctor);
      if(!doctor){
        return new NotFoundException("No existe doctor");
      }
      const especialidad = await this.especialidadService.findOne(doctor.especialidad.ID_especialidad);
      if(!especialidad){
        return new NotFoundException("No existe especialidad");
      }

    let consultorioDoctorExiste = await this.consultorioRepository.exists({
      where: { 
        doctor: { 
          ID_doctor : createConsultorioDto.id_doctor , 
          especialidad : { 
            ID_especialidad :
             createConsultorioDto.id_especialidad 
            } 
        },
        es_eliminado : false   
        } 
    })
    if(consultorioDoctorExiste){
      return new NotFoundException("Doctor ya registrado en un consultorio");
    }

      
      const usuario = this.consultorioRepository.create({
        ...createConsultorioDto,
        especialidad : especialidad,
        doctor : doctor,
        emfermera : emfermera
      });




      const consultorioNuevo = await  this.consultorioRepository.save(usuario)
      return consultorioNuevo;
  }

  async findAll() {

    let consultorios = await this.consultorioRepository
    .find(
      { 
        relations : { 
          especialidad : true , 
          doctor: { usuario : true },
          emfermera : true
        },
        where: {
          es_eliminado : false
        } 
      }
    )

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
       relations : { especialidad : true , doctor: true , emfermera : true }
     } );
     if (!consultorio) {
       throw new NotFoundException('Consultorio no encontrado');
     }
     return consultorio;
  }


  async findConsultorioPorDoctor(idDoctor: string) {
    const consultorio = await this.consultorioRepository.findOne(
      { 
       where : { doctor : { ID_doctor : idDoctor }  }, 
       relations : { especialidad : true , doctor: true }
     } );
 
     if (!consultorio) {
       throw new NotFoundException('No se encontro un consultorio');
     }
     return consultorio;
  }

  async update(id: string, updateConsultorioDto: UpdateConsultorioDto) {
    const consultorio = await this.findOne(id);
    if (!consultorio) {
      throw new NotFoundException('Usuario no encontrado');
    }

    let consultorioDoctorExiste = await this.consultorioRepository.exists({
      where: { 
        doctor: { 
          ID_doctor : updateConsultorioDto.id_doctor , 
          especialidad : { 
            ID_especialidad :
            updateConsultorioDto.id_especialidad 
            } 
        },
        es_eliminado : false   
        } 
    })
    if(consultorioDoctorExiste){
      return new NotFoundException("Doctor ya registrado en un consultorio");
    }



      consultorio.ubicacion = updateConsultorioDto.ubicacion;
      consultorio.es_activo = updateConsultorioDto.es_activo;
      const doctor = await this.doctorService.findOne(updateConsultorioDto.id_doctor);
      consultorio.doctor = doctor;
      const especialidad = await this.especialidadService.findOne(updateConsultorioDto.id_especialidad);
      consultorio.especialidad = especialidad;
      console.log(consultorio.es_activo)
      await this.consultorioRepository.save(consultorio);
      return await this.findOne(id);
  }

  async remove(id: string) {
    const consultorio = await this.findOne(id);
    if (!consultorio) {
      throw new NotFoundException('Consultorio no encontrado');
    }
    // consultorio.es_eliminado = true;
    // await this.consultorioRepository.save( consultorio )
    await this.consultorioRepository.delete(id);

    return true;
  }
}

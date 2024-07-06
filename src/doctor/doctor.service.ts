import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolService } from 'src/rol/rol.service';
import { EspecialidadService } from 'src/especialidad/especialidad.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { DisponibilidadService } from 'src/disponibilidad/disponibilidad.service';
import { Disponibilidad } from 'src/disponibilidad/entities/disponibilidad.entity';
import { ReservacionService } from 'src/reservacion/reservacion.service';

@Injectable()
export class DoctorService {

  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository : Repository<Doctor>,

    private readonly especialidadService : EspecialidadService,
    private readonly disponibilidadService : DisponibilidadService,


    @Inject(forwardRef(() => UsuarioService))
    private readonly usuarioService : UsuarioService,
    @Inject(forwardRef(() => ReservacionService))
    private readonly reservacionService : ReservacionService,
   
  ) {
    
  }

  async create(createDoctorDto: CreateDoctorDto) {

    const especialidad = await this.especialidadService.findOne(createDoctorDto.id_especialidad);
      if(!especialidad){
        return new NotFoundException("No existe especialidad");
      }
      const usuario = await this.usuarioService.findOne( createDoctorDto.id_usuario );
      const doctorNuevo = this.doctorRepository.create({
        ...createDoctorDto,
        especialidad : especialidad,
        usuario : usuario
      });
      return this.doctorRepository.save(doctorNuevo);
  }

  async findAll() {
    let doctores = await this.doctorRepository.find({ relations : { especialidad : true , usuario : true } })
    return doctores.map( doctor => ({
      ...doctor,
      especialidad : doctor.especialidad,
      usuario : doctor.usuario
    })) ;
  }

  async findOne(id: string) {
    const doctor = await this.doctorRepository.findOne(
      { 
       where : { ID_doctor : id  }, 
       relations : { especialidad : true , usuario : true } 
     } );
 
     if (!doctor) {
       throw new NotFoundException('Doctor no encontrado');
     }
     return doctor;
  }

  async findOneIdUsuario(idUsuario: string) {
    const doctor = await this.doctorRepository.findOne(
      { 
       where : { usuario : { ID_usuario : idUsuario }   },        
     } );
 
     if (!doctor) {
       throw new NotFoundException('Doctor no encontrado');
     }
     return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.findOne(id);
    if (!doctor) {
      throw new NotFoundException('Doctor no encontrado');
    }
    
    Object.assign( doctor , updateDoctorDto);


    if(updateDoctorDto.id_especialidad){
      const especialidad = await this.especialidadService.findOne(updateDoctorDto.id_especialidad);
      if(!especialidad){
        return new NotFoundException("No existe especialidad");
      }
      doctor.especialidad.ID_especialidad = updateDoctorDto.id_especialidad;
    }

    //generamos sus disponibilidades
    if(updateDoctorDto.ids_disponibilidad.length > 0){

        const idsArray = updateDoctorDto.ids_disponibilidad.split(',');

        //validar si no envia una disponibilidad que esta marcada como reservacion
        let reservacionesDoctor = await this.reservacionService.findReservacionPorDoctor(doctor.ID_doctor);
        if(reservacionesDoctor.length > 0){
          let idsDispoReser = reservacionesDoctor.map( item => 
            item.disponibilidad.ID_disponibilidad         
          )
          console.log(idsDispoReser);
          let resulExist = idsArray.some( item => idsDispoReser.includes( item ) )
          console.log(resulExist)
          if(!resulExist){
              return new NotFoundException("Error: Existe una reservacion asociada a una disponibilidad no seleccionada");
          }

        }
      

      //grabar nuevas disponibilidades
      let disponibilidades : Disponibilidad[] =  await this.disponibilidadService.findByMultipleIds(idsArray);
      doctor.disponibilidades = [];
      doctor.disponibilidades = disponibilidades;

    }



    await this.doctorRepository.save(doctor);

    await this.usuarioService.changeEstado( updateDoctorDto.id_usuario , updateDoctorDto.es_activo )

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.doctorRepository.delete(id);
  }

  async getDoctoresPorEspecialidad(uuidEspecialidad:string){
    let listDoctores =  await  this.doctorRepository.find(
      { 
       where : { especialidad : { ID_especialidad : uuidEspecialidad }  },
       relations: {  especialidad : true , usuario: true }        
     } );
     if(listDoctores.length == 0){
        return new NotFoundException('No existen doctores con esa especialidad')
     }

     return listDoctores;
  }
}

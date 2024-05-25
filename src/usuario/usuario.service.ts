import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolService } from 'src/rol/rol.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { PacienteService } from 'src/paciente/paciente.service';
import { CreatePacienteDto } from 'src/paciente/dto/create-paciente.dto';
import { EncryptionPassword } from 'src/seguridad/helpers/encryption.helpers';

@Injectable()
export class UsuarioService {

constructor(
  @InjectRepository(Usuario)
  private readonly usuarioRepository : Repository<Usuario>,
  private readonly rolService : RolService,
  @Inject(forwardRef(() => DoctorService))
  private readonly doctorService : DoctorService,
  @Inject(forwardRef(() => PacienteService))
  private readonly pacienteService : PacienteService,
  private readonly encryptionService: EncryptionPassword

) {
  
}

  async create(createUsuarioDto: CreateUsuarioDto) {

      const rol = await this.rolService.findOne(createUsuarioDto.id_rol);
      if(!rol){
        return new NotFoundException("No existe rol");
      }
      let contraseniaEncriptada = await this.encryptionService.encriptarContrasenia( createUsuarioDto.contrasenia )

      const usuario = this.usuarioRepository.create({
        ...createUsuarioDto,        
        contrasenia : contraseniaEncriptada,
        rol : rol
      });

      const usuarioNuevo = await  this.usuarioRepository.save(usuario)
    
      switch(rol.nombre){
        case "Paciente" : 
          // crear un paciente
          const nuevoPaciente : CreatePacienteDto = {
            celular_contacto_emergencia : null,
            contacto_emergencia : "",
            direccion : "",
            fecha_nacimiento : null,
            historial_medico : "",
            id_usuario : usuarioNuevo.ID_usuario
          }
          await this.pacienteService.create( nuevoPaciente )
        break;
        case "Doctor":            
          // crear un doctor
          const nuevoDoctor : CreateDoctorDto = {
            anios_experiencia : 0,
            codigo_colegio : "",
            id_especialidad : "dc9eb649-4d62-4bfb-bf3f-1c47e6ce1c0b",
            id_usuario : usuarioNuevo.ID_usuario
          }
          await this.doctorService.create( nuevoDoctor )
        break;
      }
 

      
      return usuarioNuevo;
  }

  async findAll() {

    let usuarios = await this.usuarioRepository.find({ relations : { rol : true } })

    return usuarios.map( usuario => ({
      ...usuario,
      rol : usuario.rol

    }) ) ;
  }

  async findOne(id: string) {
    const usuario = await this.usuarioRepository.findOne(
     { 
      where : { ID_usuario : id  }, 
      relations : { rol : true }
    } );

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    
    Object.assign( usuario , updateUsuarioDto);


    if(updateUsuarioDto.id_rol){
      const rol = await this.rolService.findOne(updateUsuarioDto.id_rol);
      if(!rol){
        return new NotFoundException("No existe rol");
      }
      usuario.rol.ID_rol = updateUsuarioDto.id_rol;
    }

    await this.usuarioRepository.save(usuario);
    return await this.findOne(id);
  }

  async remove(id: string) {
    
    const usuario = await this.findOne(id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    console.log(usuario)
    switch(usuario.rol.nombre){
      case "Paciente" : 
        // eliminar paciente
        let pacienteEliminar = await this.pacienteService.findOneIdUsuario(usuario.ID_usuario)
        await this.pacienteService.remove( pacienteEliminar.ID_paciente )
      break;
      case "Doctor":            
        // eliminar doctor
        let doctorEliminar = await this.doctorService.findOneIdUsuario(usuario.ID_usuario)
        await this.doctorService.remove( doctorEliminar.ID_doctor )
      break;
    }


    await this.usuarioRepository.delete(id);
  }
  async findTermino(numdoc:string = '', email:string = ''){
    const usuarioBuscado = await this.usuarioRepository
      .createQueryBuilder('user')
      .where('user.numero_documento = :nrodocumento OR user.email = :email', {
        nrodocumento: numdoc,
        email: email
      })
      .getOne();
      if (!usuarioBuscado) {
        return true;
      } else {
        return false;
      }

  }

}

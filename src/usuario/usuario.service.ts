import { Inject, Injectable, Logger, NotFoundException, forwardRef } from '@nestjs/common';
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
import { MailService } from 'src/mail/mail.service';
import { RegistrarPacienteDto } from 'src/mail/dto/create-mail.dto';

@Injectable()
export class UsuarioService {

private readonly logger = new Logger(UsuarioService.name);
constructor(
  @InjectRepository(Usuario)
  private readonly usuarioRepository : Repository<Usuario>,
  private readonly rolService : RolService,
  @Inject(forwardRef(() => DoctorService))
  private readonly doctorService : DoctorService,
  @Inject(forwardRef(() => PacienteService))
  private readonly pacienteService : PacienteService,
  private readonly encryptionService: EncryptionPassword,
  private readonly mailService : MailService

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
          let dtoRegistroPaciente : RegistrarPacienteDto = {
            nombreCompleto : `${createUsuarioDto.nombre} ${createUsuarioDto.apellido}`,
            correo : createUsuarioDto.email,
            contrasenia : createUsuarioDto.contrasenia 
          }
          this.logger.log(`Envio de correo a ${dtoRegistroPaciente.nombreCompleto}`);
          await this.mailService.registroPaciente( dtoRegistroPaciente )
        break;
        case "Doctor":            
          // crear un doctor
          const nuevoDoctor : CreateDoctorDto = {
            anios_experiencia : createUsuarioDto.anios_experiencia ?? 0,
            codigo_colegio : createUsuarioDto.codigo_colegio ?? "",
            id_especialidad : createUsuarioDto.id_especialidad ?? "dc9eb649-4d62-4bfb-bf3f-1c47e6ce1c0b",
            id_usuario : usuarioNuevo.ID_usuario
          }
          await this.doctorService.create( nuevoDoctor )
        break;
      }
 

      
      return usuarioNuevo;
  }

  async findAll() {

    let usuarios = await this.usuarioRepository.find({ where : { es_eliminado: false } , relations : { rol : true } })

    return usuarios.map( usuario => ({
      ...usuario,
      rol : usuario.rol

    }) ) ;
  }

  async findOne(id: string) {
    const usuario = await this.usuarioRepository.findOne(
     { 
      where : { ID_usuario : id  }, 
      relations : { rol : true , doctor : true , paciente : true }
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

    if(updateUsuarioDto.id_rol){
      const rol = await this.rolService.findOne(updateUsuarioDto.id_rol);
      if(!rol){
        return new NotFoundException("No existe rol");
      }
      if(usuario.rol.ID_rol != updateUsuarioDto.id_rol){
          
          // si cambia de doctor a paciente o viceversa
          switch(rol.nombre){
            case "Administrador" :
                await this.pacienteService.remove(usuario.paciente.ID_paciente) 
                await this.doctorService.remove( usuario.doctor.ID_doctor )
            break;
            case "Paciente" : 
              if(usuario.doctor != null){
                await this.doctorService.remove( usuario.doctor.ID_doctor )
              }
              if(usuario.paciente == null) {
                let pacienteDto : CreatePacienteDto = {
                  fecha_nacimiento : null,
                  id_usuario : id,
                  celular_contacto_emergencia : null,
                  contacto_emergencia : "",
                  direccion: "",
                  historial_medico : ""
                }
                await this.pacienteService.create(pacienteDto) 
              }
            break;
            case "Doctor":  
              if(usuario.paciente != null) {
                await this.pacienteService.remove(usuario.paciente.ID_paciente) 
              }   
              if(usuario.doctor == null) {
                let doctorDto : CreateDoctorDto = {
                  id_usuario : id,
                  anios_experiencia : 0,
                  codigo_colegio: "",
                  id_especialidad: "dc9eb649-4d62-4bfb-bf3f-1c47e6ce1c0b"
                }
                await this.doctorService.create(doctorDto) 
              }       
            break;
          }
         
          usuario.rol.ID_rol = updateUsuarioDto.id_rol; 
      }

      Object.assign( usuario , updateUsuarioDto);
      usuario.es_activo = updateUsuarioDto.es_activo;
    }


    await this.usuarioRepository.save(usuario);
    return await this.findOne(id);
  }

  async remove(id: string) {
    
    const usuario = await this.findOne(id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    switch(usuario.rol.nombre){
      case "Paciente" : 
        await this.pacienteService.remove( usuario.paciente.ID_paciente )
      break;
      case "Doctor":            
        await this.doctorService.remove( usuario.doctor.ID_doctor )
      break;
    }

    usuario.es_eliminado = true;
    await this.usuarioRepository.save( usuario )
    return true; 
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

  async changeEstado( uuidUsuario : string , nuevoEstado : boolean ){
    const usuario = await this.findOne(uuidUsuario);
    usuario.es_activo = nuevoEstado,
    await this.usuarioRepository.save( usuario )
  }

}

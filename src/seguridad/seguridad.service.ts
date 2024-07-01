import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDTO } from './dto/Login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { EncryptionPassword } from './helpers/encryption.helpers';

@Injectable()
export class SeguridadService {

  constructor(
    @InjectRepository(Usuario)
  private readonly usuarioRepository : Repository<Usuario>, 
  private readonly encryptionService: EncryptionPassword  
  ) {
    
  }

  async loginUsuario(loginDto: LoginDTO) {


      const loginUsuario = await this.usuarioRepository.findOne({
        where : { email : loginDto.email , es_eliminado : false },
        relations: { rol : true }
      })
      if(!loginUsuario){
        return new NotFoundException('Usuario y/o contraseña invalida');
      }
      if( !await this.encryptionService.compararContrasenia( loginDto.contrasenia , loginUsuario.contrasenia ) ){
        return new NotFoundException('Usuario y/o contraseña invalida');
      }
      if(loginUsuario.es_activo == false){
        return new NotFoundException('Usuario  deshabilitado. Contacte con el Administrador.');
      }
      return loginUsuario;
    
  }

 
}

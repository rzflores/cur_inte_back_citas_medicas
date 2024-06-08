import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Repository } from 'typeorm';

@Injectable()
export class PacienteService {

  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository : Repository<Paciente>,
    @Inject(forwardRef(() => UsuarioService))
    private readonly usuarioService : UsuarioService,

  ) {
   
  }

  async create(createPacienteDto: CreatePacienteDto) {
      const usuario = await this.usuarioService.findOne( createPacienteDto.id_usuario );
      const pacienteNuevo = this.pacienteRepository.create({
        ...createPacienteDto,
        usuario : usuario
      });
      return this.pacienteRepository.save(pacienteNuevo);
  }

  async findAll() {
    let pacientes = await this.pacienteRepository.find({ relations : { usuario : true } })

    return pacientes.map( paciente => ({
      ...paciente,
      usuario : paciente.usuario
    })) ;
  }

  async findOne(id: string) {
    const paciente = await this.pacienteRepository.findOne(
      { 
       where : { ID_paciente : id  }, 
       relations : { usuario : true } 
     } );
 
     if (!paciente) {
       throw new NotFoundException('Doctor no encontrado');
     }
     return paciente;
  }

  async findOneIdUsuario(idUsuario: string) {
    const paciente = await this.pacienteRepository.findOne(
      { 
       where : { usuario : { ID_usuario : idUsuario }   },        
     });

 
     if (!paciente) {
       throw new NotFoundException('Paciente no encontrado');
     }
     return paciente;
  }


  async update(id: string, updatePacienteDto: UpdatePacienteDto) {
    const paciente = await this.findOne(id);
    if (!paciente) {
      throw new NotFoundException('Doctor no encontrado');
    }
    
    Object.assign( paciente , updatePacienteDto);

    await this.pacienteRepository.save(paciente);

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.pacienteRepository.delete(id);
  }

  
}

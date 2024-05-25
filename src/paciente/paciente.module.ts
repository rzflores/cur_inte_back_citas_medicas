import { Module, forwardRef } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { RolModule } from 'src/rol/rol.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  controllers: [PacienteController],
  providers: [PacienteService],
  imports: [ 
    TypeOrmModule.forFeature([
      Paciente,
    ]),
    RolModule ,
    forwardRef( () => UsuarioModule)
  ],
  exports : [ PacienteService , TypeOrmModule ]  
})
export class PacienteModule {}

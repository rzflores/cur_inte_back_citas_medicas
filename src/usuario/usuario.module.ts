import { Module, forwardRef } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { RolModule } from 'src/rol/rol.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PacienteModule } from '../paciente/paciente.module';
import { SeguridadModule } from '../seguridad/seguridad.module';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  imports: [ 
    TypeOrmModule.forFeature([
      Usuario,
    ]),
    RolModule ,
    forwardRef( () => DoctorModule),
    forwardRef( () => PacienteModule),
    forwardRef( () => SeguridadModule),
  ],
  exports : [ UsuarioService , TypeOrmModule ]  
})
export class UsuarioModule {}

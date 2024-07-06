import { Module, forwardRef } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { EspecialidadModule } from 'src/especialidad/especialidad.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { DisponibilidadModule } from 'src/disponibilidad/disponibilidad.module';
import { ReservacionModule } from 'src/reservacion/reservacion.module';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService],
  imports: [ 
    TypeOrmModule.forFeature([
    Doctor,
    ]),
    
    EspecialidadModule ,  
    DisponibilidadModule,
    forwardRef( () => UsuarioModule ),
    forwardRef( () => ReservacionModule ),
    
 ],
 exports: [ DoctorService , TypeOrmModule ]
})
export class DoctorModule {}

import { forwardRef, Module } from '@nestjs/common';
import { ReservacionService } from './reservacion.service';
import { ReservacionController } from './reservacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservacion } from './entities/reservacion.entity';
import { PacienteModule } from 'src/paciente/paciente.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { ConsultorioModule } from 'src/consultorio/consultorio.module';
import { DisponibilidadModule } from 'src/disponibilidad/disponibilidad.module';

@Module({
  controllers: [ReservacionController],
  providers: [ReservacionService],
  imports: [
    TypeOrmModule.forFeature([
      Reservacion
    ]),
    PacienteModule,
    ConsultorioModule,
    DisponibilidadModule,

    
  ],
  exports: [ ReservacionService , TypeOrmModule ]
})
export class ReservacionModule {}

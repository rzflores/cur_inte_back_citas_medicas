import { Module } from '@nestjs/common';
import { ConsultorioService } from './consultorio.service';
import { ConsultorioController } from './consultorio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultorio } from './entities/consultorio.entity';
import { EspecialidadService } from 'src/especialidad/especialidad.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { EspecialidadModule } from 'src/especialidad/especialidad.module';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  controllers: [ConsultorioController],
  providers: [ConsultorioService],
  imports: [
    TypeOrmModule.forFeature([
      Consultorio
    ]),
    EspecialidadModule,
    DoctorModule
  ]
})
export class ConsultorioModule {}

import { forwardRef, Module } from '@nestjs/common';
import { DisponibilidadService } from './disponibilidad.service';
import { DisponibilidadController } from './disponibilidad.controller';
import { Disponibilidad } from './entities/disponibilidad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  controllers: [DisponibilidadController],
  providers: [DisponibilidadService],
  imports: [ 
    TypeOrmModule.forFeature([
    Disponibilidad
    ]),
    forwardRef( () => DoctorModule),
  ],
  exports: [ DisponibilidadService , TypeOrmModule ]
})
export class DisponibilidadModule {}

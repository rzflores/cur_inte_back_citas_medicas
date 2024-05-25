import { Module } from '@nestjs/common';
import { EspecialidadService } from './especialidad.service';
import { EspecialidadController } from './especialidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidad } from './entities/especialidad.entity';

@Module({
  controllers: [EspecialidadController],
  providers: [EspecialidadService],
  imports: [
    TypeOrmModule.forFeature([
      Especialidad
    ])
  ],
  exports : [ EspecialidadService , TypeOrmModule ]
})
export class EspecialidadModule {}

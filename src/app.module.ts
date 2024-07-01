import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { EspecialidadModule } from './especialidad/especialidad.module';
import { ConsultorioModule } from './consultorio/consultorio.module';
import { Especialidad } from './especialidad/entities/especialidad.entity';
import { Consultorio } from './consultorio/entities/consultorio.entity';
import { DoctorModule } from './doctor/doctor.module';
import { PacienteModule } from './paciente/paciente.module';
import { ReservacionModule } from './reservacion/reservacion.module';
import { Doctor } from './doctor/entities/doctor.entity';
import { Paciente } from './paciente/entities/paciente.entity';
import { Reservacion } from './reservacion/entities/reservacion.entity';
import { RolModule } from './rol/rol.module';
import { Rol } from './rol/entities/rol.entity';
import { SeguridadModule } from './seguridad/seguridad.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      autoLoadEntities: true,
      synchronize: true,
      entities : [ Usuario , Especialidad , Consultorio , Doctor , Paciente , Reservacion , Rol ]
    }),
    UsuarioModule,
    EspecialidadModule,
    ConsultorioModule,
    DoctorModule,
    PacienteModule,
    ReservacionModule,
    RolModule,
    SeguridadModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

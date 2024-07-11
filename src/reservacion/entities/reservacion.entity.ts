import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Consultorio } from 'src/consultorio/entities/consultorio.entity';
import { Disponibilidad } from 'src/disponibilidad/entities/disponibilidad.entity';
import { DisponibilidadController } from '../../disponibilidad/disponibilidad.controller';

@Entity()
export class Reservacion {
  @PrimaryGeneratedColumn('uuid')
  ID_reservacion: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.reservaciones)
  paciente: Paciente;

  @ManyToOne(() => Doctor, (doctor) => doctor.reservaciones)
  doctor: Doctor;

  @ManyToOne(() => Consultorio, (consultorio) => consultorio.reservaciones)
  consultorio: Consultorio;

  @ManyToOne(() => Disponibilidad, reservacion => reservacion.reservaciones)
  @JoinColumn({ name: 'ID_disponibilidad' })
  disponibilidad: Disponibilidad;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ default : false })
  es_eliminado: boolean;

  //0 pendiente y 1 culminada
  @Column() 
  estado: number;

  @BeforeInsert()
  generarPendiente(){       
          this.estado = 0
  }

}

import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Especialidad } from 'src/especialidad/entities/especialidad.entity';
import { Reservacion } from 'src/reservacion/entities/reservacion.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Consultorio {
  @PrimaryGeneratedColumn('uuid')
  ID_consultorio: string;

  @Column()
  nombre_consultorio: string;

  @Column()
  ubicacion: string;

  @Column({ default : false })
  es_eliminado: boolean;

  @OneToOne(() => Doctor, doctor => doctor.consultorio)
  @JoinColumn()
  doctor: Doctor;

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.consultorios)
  especialidad: Especialidad;

  @OneToMany(() => Reservacion, (reservacion) => reservacion.consultorio)
  reservaciones: Reservacion[];
}

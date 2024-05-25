import { Consultorio } from 'src/consultorio/entities/consultorio.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Especialidad {
  @PrimaryGeneratedColumn('uuid')
  ID_especialidad: string;

  @Column()
  nombre_especialidad: string;

  @Column({ default : false })
  es_eliminado: boolean;

  @OneToMany(() => Consultorio, (consultorio) => consultorio.especialidad)
  consultorios: Consultorio[];

  @OneToMany(() => Doctor, (doctor) => doctor.especialidad)
  doctores: Doctor[];
}

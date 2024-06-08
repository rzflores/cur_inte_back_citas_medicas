import { Consultorio } from 'src/consultorio/entities/consultorio.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';

@Entity()
export class Especialidad {
  @PrimaryGeneratedColumn('uuid')
  ID_especialidad: string;

  @Column()
  nombre_especialidad: string;

  
  @Column('decimal', { precision: 10, scale: 2 })
  precio_especialidad: number;

  @Column({ default : false })
  es_eliminado: boolean;

  @Column({ default: true })
  es_activo: boolean;


  @OneToMany(() => Consultorio, (consultorio) => consultorio.especialidad)
  consultorios: Consultorio[];

  @OneToMany(() => Doctor, (doctor) => doctor.especialidad)
  doctores: Doctor[];

  @BeforeInsert()
  generarEsActivo(){       
          this.es_activo = true
  }

  
}

import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Emfermera } from 'src/emfermera/entities/emfermera.entity';
import { Especialidad } from 'src/especialidad/entities/especialidad.entity';
import { Reservacion } from 'src/reservacion/entities/reservacion.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';

@Entity()
export class Consultorio {
  @PrimaryGeneratedColumn('uuid')
  ID_consultorio: string;

  @Column()
  ubicacion: string;

  @Column({ default : false })
  es_eliminado: boolean;

  @Column({ default: true })
  es_activo: boolean;


  @OneToOne(() => Doctor, doctor => doctor.consultorio)
  @JoinColumn()
  doctor: Doctor;


  @OneToOne(() => Emfermera, emfermera => emfermera.consultorio)
  @JoinColumn()
  emfermera: Emfermera;


  @ManyToOne(() => Especialidad, (especialidad) => especialidad.consultorios)
  especialidad: Especialidad;

  @OneToMany(() => Reservacion, (reservacion) => reservacion.consultorio)
  reservaciones: Reservacion[];

  @BeforeInsert()
  generarEsActivo(){       
          this.es_activo = true
  }
}

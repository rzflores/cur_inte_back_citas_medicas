import { Consultorio } from 'src/consultorio/entities/consultorio.entity';
import { Especialidad } from 'src/especialidad/entities/especialidad.entity';
import { Reservacion } from 'src/reservacion/entities/reservacion.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, Column, JoinColumn } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  ID_doctor: string;

  @Column()
  anios_experiencia: number;

  @Column()
  codigo_colegio : string;
  
  @OneToOne(() => Usuario , { onDelete: 'CASCADE' })
  @JoinColumn()
  usuario: Usuario;

  @Column({ default : false })
  es_eliminado: boolean;


  @OneToOne(() => Consultorio, consultorio => consultorio.doctor)
  consultorio: Consultorio;

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.doctores)
  especialidad: Especialidad;

  @OneToMany(() => Reservacion, (reservacion) => reservacion.doctor)
  reservaciones: Reservacion[];
}

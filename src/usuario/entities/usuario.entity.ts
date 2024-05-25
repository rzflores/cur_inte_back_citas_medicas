import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  ID_usuario: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  email: string;

  @Column()
  contrasenia: string;

  @Column()
  celular: string;

  @Column({ default : false })
  es_eliminado: boolean;

  @Column()
  numero_documento: string;

  @Column()
  tipo_documento: string;


  @ManyToOne(() => Rol, rol => rol.usuarios)
  @JoinColumn({ name: 'ID_rol' })
  rol: Rol;

  @OneToOne(() => Paciente, (paciente) => paciente.usuario)
  paciente: Paciente;

  @OneToOne(() => Doctor, (doctor) => doctor.usuario)
  doctor: Doctor;
}

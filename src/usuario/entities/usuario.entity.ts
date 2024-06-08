import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne, BeforeInsert } from 'typeorm';

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

  @Column({ nullable : true })
  celular: string;

  @Column({ default : false })
  es_eliminado: boolean;

  @Column()
  numero_documento: string;

  @Column()
  tipo_documento: string;

  
  @Column({ default: true })
  es_activo: boolean;


  @ManyToOne(() => Rol, rol => rol.usuarios)
  @JoinColumn({ name: 'ID_rol' })
  rol: Rol;

  @OneToOne(() => Paciente, (paciente) => paciente.usuario)
  paciente: Paciente;

  @OneToOne(() => Doctor, (doctor) => doctor.usuario)
  doctor: Doctor;

  
  @BeforeInsert()
  generarEsActivo(){       
          this.es_activo = true
  }
}


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Reservacion } from 'src/reservacion/entities/reservacion.entity';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  ID_paciente: string;

  @OneToOne(() => Usuario , { onDelete: 'CASCADE' })
  @JoinColumn()
  usuario: Usuario;

  @Column({ type : 'date' , nullable: true})
  fecha_nacimiento: Date;

  @Column()
  direccion: string;

  @Column()
  contacto_emergencia: string;

  @Column({ nullable : true})
  celular_contacto_emergencia: string;

  @Column('text')
  historial_medico: string;

  @Column({ default : false })
  es_eliminado: boolean;

  @OneToMany(() => Reservacion , (reservacion) => reservacion.paciente)  reservaciones: Reservacion[];
}

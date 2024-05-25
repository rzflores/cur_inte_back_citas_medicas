import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Consultorio } from 'src/consultorio/entities/consultorio.entity';

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

  @Column()
  fecha_hora: Date;

  @Column({ default : false })
  es_eliminado: boolean;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'confirmada', 'cancelada'],
  })
  estado: 'pendiente' | 'confirmada' | 'cancelada';
}

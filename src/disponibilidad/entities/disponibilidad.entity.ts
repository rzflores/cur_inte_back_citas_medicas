import { Doctor } from "src/doctor/entities/doctor.entity";
import { Reservacion } from "src/reservacion/entities/reservacion.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Disponibilidad {
    @PrimaryGeneratedColumn('uuid')
    ID_disponibilidad: string;
    
    @Column()
    orden: number;

    @Column()
    descripcion: string;

    @ManyToMany(() => Doctor, doctor => doctor.disponibilidades)
    doctores: Doctor[];


    @OneToMany(() => Reservacion, reservacion => reservacion.disponibilidad)
    reservaciones: Reservacion[];
}

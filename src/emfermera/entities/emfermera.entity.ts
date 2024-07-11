import { Consultorio } from "src/consultorio/entities/consultorio.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Emfermera {
  @PrimaryGeneratedColumn('uuid')
  ID_emfermera: string;

  @Column()
  nombres: string;

  @Column()
  apellidos : string;

  @Column({ default : false })
  es_eliminado: boolean;

  @Column({default : false})
  es_disponible: boolean

  @OneToOne(() => Consultorio, consultorio => consultorio.emfermera)
  consultorio: Consultorio;
}

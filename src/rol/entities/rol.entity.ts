import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column,  OneToMany } from 'typeorm';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  ID_rol: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ default : false })
  es_eliminado: boolean;

  @OneToMany(() => Usuario, usuario => usuario.rol)
  usuarios: Usuario[];
}

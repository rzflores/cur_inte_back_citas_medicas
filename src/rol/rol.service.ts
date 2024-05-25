import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolService {

  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository : Repository<Rol>,

  ) {
  
    
  }
  
  async findAll() {
    return await this.rolRepository.find();
  }

  async findOne(id: string) {
    const rol = await this.rolRepository.findOneBy( { ID_rol : id });
    if(!rol){
      throw new NotFoundException('Rol no encontrada');
    }
    return rol;
  }

  
}

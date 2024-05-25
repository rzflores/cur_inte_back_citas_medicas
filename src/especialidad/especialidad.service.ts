import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EspecialidadService {

  constructor(
    @InjectRepository(Especialidad)
    private readonly especialidadRepository : Repository<Especialidad>,
  ) {
  }

  async create(createEspecialidadDto: CreateEspecialidadDto) {
    const especialidad = await this.especialidadRepository.create(createEspecialidadDto);
    return await this.especialidadRepository.save(especialidad);
  }

  async findAll() {
    return await this.especialidadRepository.find();
  }

  async findOne(id: string) {
    const especialidad = await this.especialidadRepository.findOneBy( { ID_especialidad : id });
    if (!especialidad) {
      throw new NotFoundException('Especialidad no encontrada');
    }
    return especialidad;
  }

  async update(id: string, updateEspecialidadDto: UpdateEspecialidadDto) {
    const especialidad = await this.findOne(id);
    if (!especialidad) {
      throw new NotFoundException('Especialidad no encontrada');
    }
    await this.especialidadRepository.update(id, updateEspecialidadDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.especialidadRepository.delete(id);
  }
}

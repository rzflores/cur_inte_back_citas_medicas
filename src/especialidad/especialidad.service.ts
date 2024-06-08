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
    let newEspecialidad : Especialidad = new Especialidad();
    newEspecialidad.nombre_especialidad = createEspecialidadDto.nombre_especialidad;
    newEspecialidad.precio_especialidad = parseFloat(createEspecialidadDto.precio_especialidad);

    const especialidad = await this.especialidadRepository.create(newEspecialidad);
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
    let editEspecialidad : Especialidad = new Especialidad();
    editEspecialidad.nombre_especialidad = updateEspecialidadDto.nombre_especialidad;
    editEspecialidad.precio_especialidad = parseFloat(updateEspecialidadDto.precio_especialidad);
    editEspecialidad.es_activo = updateEspecialidadDto.es_activo;

    await this.especialidadRepository.update(id, editEspecialidad);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.especialidadRepository.delete(id);
    return true;
  }
}

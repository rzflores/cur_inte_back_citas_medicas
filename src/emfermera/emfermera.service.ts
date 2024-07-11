import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmfermeraDto } from './dto/create-emfermera.dto';
import { UpdateEmfermeraDto } from './dto/update-emfermera.dto';
import { Emfermera } from './entities/emfermera.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmfermeraService {

  constructor(
    @InjectRepository(Emfermera)
    private readonly _emfermeraRepository : Repository<Emfermera>,
  ) {
    
  }

  async create(createEmfermeraDto: CreateEmfermeraDto) {
    const emfermeraNueva = this._emfermeraRepository.create({
      ...createEmfermeraDto,
    });
    return this._emfermeraRepository.save(emfermeraNueva);
  }

  async findAll() {
    let emfermeras = await this._emfermeraRepository.find({})
    return emfermeras;
  }

  async findOne(id: string) {
    const emfermera = await this._emfermeraRepository.findOne(
      { 
       where : { ID_emfermera : id  }, 
     } );
 
     if (!emfermera) {
       throw new NotFoundException('Doctor no encontrado');
     }
     return emfermera;
  }

  async update(id: string, updateEmfermeraDto: UpdateEmfermeraDto) {
    const emfermera = await this.findOne(id);
    if (!emfermera) {
      throw new NotFoundException('Especialidad no encontrada');
    }
    let editEmfermera : Emfermera = new Emfermera();
    editEmfermera.nombres = updateEmfermeraDto.nombres;
    editEmfermera.apellidos = updateEmfermeraDto.apellidos;

    await this._emfermeraRepository.update(id, editEmfermera);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this._emfermeraRepository.delete(id);
    return true;
  }
}

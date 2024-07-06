import { Injectable } from '@nestjs/common';
import { Disponibilidad } from './entities/disponibilidad.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DisponibilidadService {
  

  constructor(
    @InjectRepository(Disponibilidad)
    private readonly disponibilidadRepository : Repository<Disponibilidad>,
  ) {
  }

  async findAll() {
    return await this.disponibilidadRepository.find({ order: {  orden : 'ASC' } })
  }

  async findOne( idDisponibilidad : string ) {
    return await this.disponibilidadRepository.findOne({ where : { ID_disponibilidad : idDisponibilidad  }  }  )
  }


  async findByDoctor(idDoctor : string) {
    let result = await this.disponibilidadRepository.createQueryBuilder('disponibilidad')
      .innerJoin('disponibilidad.doctores', 'doctor')
      .where('doctor.ID_doctor = :idDoctor', { idDoctor })
      .orderBy('disponibilidad.orden','ASC')
      .getMany();

      return result;
  }


  async findByMultipleIds(ids: string[]): Promise<Disponibilidad[]> {
    return this.disponibilidadRepository.find({
      where: {
        ID_disponibilidad: In(ids),
      },
    });
  }
  

  
}

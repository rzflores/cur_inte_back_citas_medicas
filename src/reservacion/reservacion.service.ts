import { Injectable } from '@nestjs/common';
import { CreateReservacionDto } from './dto/create-reservacion.dto';
import { UpdateReservacionDto } from './dto/update-reservacion.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservacion } from './entities/reservacion.entity';

@Injectable()
export class ReservacionService {

  constructor(
    @InjectRepository(Reservacion)
    private readonly reservacionRepository : Repository<Reservacion>,
  ) {
    
    
  }

  async create(createReservacionDto: CreateReservacionDto) {
    
  }

  async findAll() {
    
  }

  async findOne(id: number) {
    
  }

  async update(id: number, updateReservacionDto: UpdateReservacionDto) {
    
  }

  async remove(id: number) {
    await this.reservacionRepository.delete(id);
  }
}

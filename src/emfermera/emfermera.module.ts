import { Module } from '@nestjs/common';
import { EmfermeraService } from './emfermera.service';
import { EmfermeraController } from './emfermera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emfermera } from './entities/emfermera.entity';

@Module({
  controllers: [EmfermeraController],
  providers: [EmfermeraService],
  imports: [ 
    TypeOrmModule.forFeature([
    Emfermera,
    ])],
  exports: [ EmfermeraService , TypeOrmModule ]
})
export class EmfermeraModule {}

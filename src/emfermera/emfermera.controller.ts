import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmfermeraService } from './emfermera.service';
import { CreateEmfermeraDto } from './dto/create-emfermera.dto';
import { UpdateEmfermeraDto } from './dto/update-emfermera.dto';

@Controller('emfermera')
export class EmfermeraController {
  constructor(private readonly emfermeraService: EmfermeraService) {}

  @Post()
  create(@Body() createEmfermeraDto: CreateEmfermeraDto) {
    return this.emfermeraService.create(createEmfermeraDto);
  }

  @Get()
  findAll() {
    return this.emfermeraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emfermeraService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmfermeraDto: UpdateEmfermeraDto) {
    return this.emfermeraService.update(id, updateEmfermeraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emfermeraService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeguridadService } from './seguridad.service';
import { LoginDTO } from './dto/Login.dto';

@Controller('seguridad')
export class SeguridadController {
  constructor(private readonly seguridadService: SeguridadService) {}

  @Post()
  login(@Body() loginDto: LoginDTO) {
    return this.seguridadService.loginUsuario( loginDto );
  }

}

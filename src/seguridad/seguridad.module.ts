import { Module, forwardRef } from '@nestjs/common';
import { SeguridadService } from './seguridad.service';
import { SeguridadController } from './seguridad.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { EncryptionPassword } from './helpers/encryption.helpers';

@Module({
  
  controllers: [SeguridadController],
  providers: [SeguridadService , EncryptionPassword],
  imports: [
    forwardRef( () =>  UsuarioModule)
  ],
  exports: [ EncryptionPassword ]
})
export class SeguridadModule {}

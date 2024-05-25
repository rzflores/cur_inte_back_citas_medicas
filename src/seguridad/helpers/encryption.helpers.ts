import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class EncryptionPassword {
    
    async encriptarContrasenia(password: string): Promise<string> {
        const saltRounds = 10; // Número de rondas de sal
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    async compararContrasenia(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

}


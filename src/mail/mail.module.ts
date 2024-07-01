import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [MailController],
  imports:[
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          secure: false,
          port: 587,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: `Citas Web<> ${process.env.MAIL_FROM}`,
        },
        template: {
          dir: join(__dirname,'templates'),
          adapter: new (require('@nestjs-modules/mailer/dist/adapters/ejs.adapter').EjsAdapter)(),
          options: {
            strict: false,
          },
        },
     
    }),
  }),
  ],
  providers: [MailService],
  exports:[ MailService ]
})
export class MailModule {}

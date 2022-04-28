import { Injectable, Logger } from '@nestjs/common';
import { MailerOptionsFactory } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import {join} from 'path';


@Injectable()
export class MailerConfig implements MailerOptionsFactory {
  constructor(
    private configService: ConfigService
  ) { }

  createMailerOptions() {
    
    let mailerTransport = {
        transport: {
            host: this.configService.get('TRANSPORT_HOST'),
            port: this.configService.get('TRANSPORT_PORT'),
            secure: false,
            auth: {
              user: this.configService.get('AUTH_USER'),
              pass: this.configService.get('AUTH_PASSWORD')
            }
          },
          defaults: {
            from: this.configService.get('AUTH_USER')
          },
          template: {
            dir: join(__dirname, '..', 'view/confirmEmail/'),
            adapter: new EjsAdapter(),
            options: {
              strict: true,
            },
          }
        };

        return mailerTransport;
    }
};
        
        


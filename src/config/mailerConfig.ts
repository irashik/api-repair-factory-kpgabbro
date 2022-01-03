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
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
              user: "sharon.abernathy15@ethereal.email",
              pass: "PDxCCxNTRwZ9q6JQnp"
            }
          },
          defaults: {
            from: "sharon.abernathy15@ethereal.email"
          },
          template: {
            dir: join(__dirname, 'view/confirmEmail/'),
            adapter: new EjsAdapter(),
            options: {
              strict: true,
            },
          }
        };

        return mailerTransport;
    }
};
        
        



//todo 
// пусть здесь будут настройки в строковом формате.

    //transport: 'smtps://user@domain.com:pass@smtp.domain.com',
    
  //   emailsend: {
  //     user: "sharon.abernathy15@ethereal.email",
  //     password: "PDxCCxNTRwZ9q6JQnp",
  //     host: "smtp.ethereal.email",
  //     port: 587,
  //     secure: false
  //     },
  
  // AdminEmail: "sharon.abernathy15@ethereal.email"
  
  
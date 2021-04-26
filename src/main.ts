import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Logger } from '@nestjs/common';

const MongoStore  = require('connect-mongo');



async function bootstrap() {

  
  const app = await NestFactory.create(AppModule, {

  });

  const configService = app.get(ConfigService);

  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      name: configService.get('SESSION_NAME'),
      cookie: {
        "path": "/",
        "httpOnly": true,
        "maxAge": null,
        "secure": false
      },
      store: MongoStore.create({
        mongoUrl: configService.get('MONGODB_URI')
        
      })


    })
  )



  await app.listen(configService.get('HTTP_PORT'), () => {
    Logger.verbose('App started adress http://' + configService.get('HTTP_HOST') + ":" + configService.get('HTTP_PORT'));

  });



}




bootstrap();

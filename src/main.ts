import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';





async function bootstrap() {

  
  const app = await NestFactory.create(AppModule, {

  });

  const configService = app.get(ConfigService);

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      name: "session name",
      //cookie: "cokkie",
      //store: 


    })
  )



  await app.listen(configService.get('port'), () => {
    console.log(configService.get('port'));

  });

  console.log(configService.get('port'));


}




bootstrap();

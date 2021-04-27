import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';




async function bootstrap() {

  
  const app = await NestFactory.create(AppModule, {

  });

  const configService = app.get(ConfigService);

  


  await app.listen(configService.get('HTTP_PORT'), () => {
    Logger.verbose('App started adress http://' + configService.get('HTTP_HOST') + ":" + configService.get('HTTP_PORT'));

  });



}




bootstrap();

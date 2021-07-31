import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MongoExceptionFilter } from './utils/mongoExceptionFilter';




async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
      cors: true,
      
  });

  const configService = app.get(ConfigService);

  app.useGlobalFilters(new MongoExceptionFilter());

  await app.listen(configService.get('HTTP_PORT'), () => {
    Logger.verbose('App started adress http://' + configService.get('HTTP_HOST') + ":" + configService.get('HTTP_PORT'));
  });
}

bootstrap();

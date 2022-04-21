import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from "@App/app.module";
import { Logger } from '@nestjs/common';
import { MongoExceptionFilter } from "@App/utils/mongoExceptionFilter";
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { format, transports } from "winston";
import * as winston from 'winston';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
      cors: true,
      logger: WinstonModule.createLogger({
        exitOnError: false,

        format: format.combine(
          format.colorize(), format.timestamp(), format.printf(msg => {
          return `${msg.timestamp} [${msg.level}] - ${msg.message}`;
        })
      ),
      transports: [
        new transports.Console({ 
            level: "verbose",
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.ms(),
              winston.format.colorize({all: true}),
              winston.format.simple(),
              nestWinstonModuleUtilities.format.nestLike("ApiJournal", { prettyPrint: true})
            )
          }),


        new transports.File({ 
          filename: "apiRepairJournal.log",
          level: "info",
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike("ApiJournal", { prettyPrint: false})
          )
        }),
        
        ], 
    }),
     
      
  });

  const configService = app.get(ConfigService);

  app.useGlobalFilters(new MongoExceptionFilter());

  await app.listen(configService.get('HTTP_PORT'), () => {
    Logger.verbose('App started adress http://' + configService.get('HTTP_HOST') + ":" + configService.get('HTTP_PORT'));
  });
}

bootstrap();

import { Logger, Module } from '@nestjs/common';
import { AppController } from '@App/app.controller';
import { AppService } from '@App/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BidrequestModule } from '@App/bidrequest/bidrequest.module';
import { EquipmentModule } from '@App/repairs/equipment.module';

import { UsersModule } from "@App/users/users.module";
import { LoggerModule } from '@App/logger/logger.module';
import { UnitEquipmentModule } from './unit-equipment/unit-equipment.module';
import { ConfigModule } from '@nestjs/config';

import configurations from '@App/config/configurations';
import { DatabaseConfig } from '@App/config/config.database';

import { AuthModule } from '@App/auth/auth.module';
import { RepairPlanModule } from '@App/repairplan/repairplan.module';

const path = require('path');


require('dotenv').config(
  {path: path.resolve(__dirname, '..', '.development.env')}
  
  );

const environment = process.env.NODE_ENV || 'development';
Logger.log('current environment = ' + environment);


Logger.debug(process.env.VERIFED_KEY);



@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: DatabaseConfig
      

      
    }),
    BidrequestModule,
    EquipmentModule,
    UsersModule,
    AuthModule,
    LoggerModule,
    UnitEquipmentModule,
    RepairPlanModule,
    

    ConfigModule.forRoot({
      envFilePath: ['.env', `.${environment}.env` ],
      cache: true,
      isGlobal: true,
      load: [configurations],
    }),

    
    
  ],
  controllers: [AppController],
  providers: [AppService],


})

export class AppModule {}

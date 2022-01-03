import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BidrequestModule } from './bidrequest/bidrequest.module';
import { EquipmentModule } from './equipment/equipment.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import { UnitEquipmentModule } from './unit-equipment/unit-equipment.module';
import { ConfigModule } from '@nestjs/config';
import configurations from './config/configurations';
import { DatabaseConfig } from './config/config.database';
import { AuthModule } from './auth/auth.module';
import { RepairPlanModule } from './repairplan/repairplan.module';

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

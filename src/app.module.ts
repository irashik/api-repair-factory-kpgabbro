import { Module } from '@nestjs/common';
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
import { join } from 'path';





@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/repair-factory-kpgabbro', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      
    }),
    BidrequestModule,
    EquipmentModule,
    UsersModule,
    LoggerModule,
    UnitEquipmentModule,
    ConfigModule.forRoot({
      envFilePath: join(__dirname, './config/development.env'),
      cache: true,
      isGlobal: true,
      load: [configurations],
    }),
    


  ],
  controllers: [AppController],
  providers: [AppService],


})

export class AppModule {}

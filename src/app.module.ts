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
import { databaseProviders } from './config/database.providers';
import { DatabaseConfig } from './config/config.database';

const enviroment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: DatabaseConfig
      

      
    }),
    BidrequestModule,
    EquipmentModule,
    UsersModule,
    LoggerModule,
    UnitEquipmentModule,

    ConfigModule.forRoot({
      envFilePath: ['.env', `.${enviroment}.env` ],
      cache: true,
      isGlobal: true,
      load: [configurations],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],


})

export class AppModule {}

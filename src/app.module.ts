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
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { RepairplanModule } from './repairplan/repairplan.module';

const enviroment = process.env.NODE_ENV || 'development';

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

    ConfigModule.forRoot({
      envFilePath: ['.env', `.${enviroment}.env` ],
      cache: true,
      isGlobal: true,
      load: [configurations],
    }),

    RepairplanModule,

    
    
  ],
  controllers: [AppController],
  providers: [AppService],


})

export class AppModule {}

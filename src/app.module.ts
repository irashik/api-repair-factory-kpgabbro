import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { EquipmentController } from './equipment/equipment.controller';
import { EquipmentService } from './equipment/equipment.service';

import { BidrequestController } from './bidrequest/bidrequest.controller';
import { BidRequestService } from './bidrequest/bidrequest.service';
import { BidrequestModule } from './bidrequest/bidrequest.module';
import { EquipmentModule } from './equipment/equipment.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';





@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/repair-factory-kpgabbro', {
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    BidrequestModule,
    EquipmentModule,
    UsersModule,
    LoggerModule,
    


  ],
  controllers: [AppController],
  providers: [AppService],


})

export class AppModule {}

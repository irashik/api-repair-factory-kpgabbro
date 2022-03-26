import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Repair, RepairSchema } from '@App/repairs/schema/equipment.schema';
import { EquipmentRepository } from './equipment.repository';
import { Injectable, Logger } from '@nestjs/common';


//todo переименую всех вхождения с суфиксом repair....




@Module({
  imports: [
    MongooseModule.forFeature([
      {
      name: Repair.name,
      schema: RepairSchema,
      }
    ]),

  ],
  controllers: [EquipmentController],
  providers: [EquipmentService, EquipmentRepository]
})


export class EquipmentModule {}
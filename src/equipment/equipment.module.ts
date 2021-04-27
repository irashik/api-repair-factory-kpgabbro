import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipment, EquipmentSchema } from 'src/equipment/schema/equipment.schema';
import { EquipmentRepository } from './equipment.repository';
import { Injectable, Logger } from '@nestjs/common';




@Module({
  imports: [
    MongooseModule.forFeature([
      {
      name: Equipment.name,
      schema: EquipmentSchema,
      }
    ]),

  ],
  controllers: [EquipmentController],
  providers: [EquipmentService, EquipmentRepository]
})


export class EquipmentModule {}
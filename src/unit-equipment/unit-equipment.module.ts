import { Module } from '@nestjs/common';
import { UnitEquipmentService } from './unit-equipment.service';
import { UnitEquipmentController } from './unit-equipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UnitEquipment, UnitEquipmentSchema } from '@App/unit-equipment/schema/unitEquipment.schema';
import { UnitEquipmentRepository } from './unit-equipment.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: UnitEquipment.name, schema: UnitEquipmentSchema 
    }]),

  ],
  controllers: [UnitEquipmentController],
  providers: [UnitEquipmentService, UnitEquipmentRepository]
})



export class UnitEquipmentModule {}

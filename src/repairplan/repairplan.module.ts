import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepairplanController } from './repairplan.controller';
import { RepairPlanRepository } from './repairplan.repository';
import { RepairplanService } from './repairplan.service';
import { RepairPlanSchema } from './schema/repairplan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RepairplanController.name,
        schema: RepairPlanSchema,
      }
    ]),
  ],
  controllers: [RepairplanController],
  providers: [RepairplanService, RepairPlanRepository ]

})





export class RepairplanModule {}

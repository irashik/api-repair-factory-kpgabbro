import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RepairPlanController } from './repairplan.controller';
import { RepairPlanRepository } from './repairplan.repository';
import { RepairPlanService } from './repairplan.service';
import { RepairPlan, RepairPlanSchema } from './schema/repairplan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RepairPlan.name,
        schema: RepairPlanSchema,
      }
    ]),
  ],
  controllers: [RepairPlanController],
  providers: [RepairPlanService, RepairPlanRepository ]

})





export class RepairPlanModule {


}

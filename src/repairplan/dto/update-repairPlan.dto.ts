import { PartialType } from '@nestjs/mapped-types';
import { CreateRepairPlanDto } from './create-repairPlan.dto';

export class UpdateRepairPlanDto extends PartialType(CreateRepairPlanDto) {

    
}

import { Injectable, Logger } from '@nestjs/common';
import { CreateRepairPlanDto } from './dto/create-repairPlan.dto';
import { UpdateRepairPlanDto } from './dto/update-repairPlan.dto';
import { RepairPlanRepository } from './repairplan.repository';
import { RepairPlan } from './schema/repairplan.schema';




@Injectable()
export class RepairPlanService {
    constructor(private readonly repairPlanRepository: RepairPlanRepository) {}

    async create(createPlanDto: CreateRepairPlanDto): Promise<RepairPlan> {
        return this.repairPlanRepository.create(createPlanDto);
    }

    async findAll(find: any): Promise<RepairPlan[]>{
        Logger.debug('service find== ' + JSON.stringify(find));

        if (!find) {
            find = {}
        };

        return this.repairPlanRepository.findAll(find);
    }    
 
   

  async findOne(_id: string): Promise<RepairPlan> {
    return this.repairPlanRepository.findOne({_id});
  }

  async update(id: string, updatePlanDto: UpdateRepairPlanDto): Promise<RepairPlan> {
    return this.repairPlanRepository.findAndModify({ "_id": id}, updatePlanDto);
  }

  async remove(id: string): Promise<RepairPlan> {


      //     "lastErrorObject": {
      //       "n": 1
      //   },
      //   "value": {....}
      //   "ok": 1}


      //   {
      //     "lastErrorObject": {
      //         "n": 0
      //     },
      //     "value": null,
      //     "ok": 1
      // }


      // возвращай ему успех или ошибку, или что ничего не удалил


    return this.repairPlanRepository.remove({"_id": id});

  }

}

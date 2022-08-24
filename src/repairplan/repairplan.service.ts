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

    async findAll(query: any): Promise<RepairPlan[]>{

      let dateCreated = query.dateСreated;
      let equipment = query.equipment;
      let minDate = query.minDate; //2021-07-26T16:33:31.676Z
      let maxDate = query.maxDate;
      let status = query.status;
      let tag = query.tag;
      let importance = query.importance;
      let description = query.description;
      let priority = query.priority;
      
      let find:any = {};

      
      if(status) {
        find.$and = [{"status": status}] 
      } else {
        find.$and = [
          {$or: [
            {"status": {"$nin": ["FINISHED", "CANCELLED"]}}
          ]}
        ]
      }
      if(dateCreated && minDate && maxDate) {
        find.$and.push({
          dateCreated: {
            $gte: minDate,
            $lt: maxDate
          }})
      }
      if(equipment) {
        find.$and.push({"equipment": equipment})
      }
      if(tag) {
        find.$and.push({
          tag: { $regex: tag.toString(), $options: 'i' }
        })
      }
      if(priority) {
        find.$and.push({
          priority: {$regex: priority.toString(), $options: 'i'}
        })
      }
      if(importance) {
        find.$and.push({"importance": importance })
      }
      if(description) {
        find.$and.push({
          $text: {$search: description.toString()},
          scope: {$meta: "textScope"}
        });
      }






        return await this.repairPlanRepository.findAll(find);
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

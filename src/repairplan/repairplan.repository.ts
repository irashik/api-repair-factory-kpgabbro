import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from 'mongoose';
import { RepairPlan, RepairPlanDocument } from "./schema/repairplan.schema";


@Injectable()
export class RepairPlanRepository {
    constructor(
        @InjectModel(RepairPlan.name) 
        private repairPlanModel: Model<RepairPlanDocument> ) 
    {}


    async create(repairPlan: RepairPlan): Promise<RepairPlan> {
        const newPlan = new this.repairPlanModel(repairPlan);
        return newPlan.save();
    }

    async findOne(planFilterQuery: FilterQuery<RepairPlan>): Promise<RepairPlan> {
        return this.repairPlanModel.findOne(planFilterQuery)
                .populate({path: 'author', select: 'name'})
                .populate('equipment')
    
    }

    async findAll(planFilterQuery: FilterQuery<RepairPlan>): Promise<RepairPlan[]> {
        return this.repairPlanModel.find(planFilterQuery)
                .populate({path: 'author', select: 'name'})
                .populate('equipment')
                .sort({dateCreated: -1})

        //проверка ролей 


    }
    async findAndModify(planFilterQuery: FilterQuery<RepairPlan>, 
                        repairPlan: Partial<RepairPlan>): Promise<RepairPlan> {
       // change findOneAndUpdate to findAndModify 
        const options = { 
            returnOriginal: false
        }
        const modifedPlan = this.repairPlanModel
                    .findOneAndUpdate(planFilterQuery, repairPlan, options);
        return modifedPlan;
    }
    async remove(planFilterQuery: FilterQuery<RepairPlan>): Promise<RepairPlan> {
        const options = {
            rawResult: true
        }
        const resultDelete = this.repairPlanModel
                            .findOneAndDelete(planFilterQuery, options);
        
        return resultDelete;

    }




  
}
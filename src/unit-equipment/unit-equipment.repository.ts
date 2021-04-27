import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { UnitEquipment, UnitEquipmentDocument } from './schema/unitEquipment.schema';
import { FilterQuery, Model } from 'mongoose';



@Injectable()
export class UnitEquipmentRepository {
    constructor(
        @InjectModel(UnitEquipment.name) 
        private unitEquipmentModel: Model<UnitEquipmentDocument> ) {

        }

    async findOne(unitEquipmentFilterQuery: FilterQuery<UnitEquipment>): Promise<UnitEquipment> {
        return this.unitEquipmentModel.findOne(unitEquipmentFilterQuery);
    }

    async findAll(unitEquipmentFilterQuery: FilterQuery<UnitEquipment>): Promise<UnitEquipment[]> {
        return this.unitEquipmentModel.find(unitEquipmentFilterQuery);

    }

    async findAndModify(unitEquipmentFilterQuery: FilterQuery<UnitEquipment>, unitEquipment: Partial<UnitEquipment>): Promise<UnitEquipment> {
        // change findOneAndUpdate to findAndModify 
        const options = { 
            returnOriginal: false
        }

        return this.unitEquipmentModel.findOneAndUpdate(unitEquipmentFilterQuery, unitEquipment, options);
        
    }

  
}


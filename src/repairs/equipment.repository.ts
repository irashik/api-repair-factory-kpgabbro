import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Repair, RepairDocument } from './schema/equipment.schema';
import { FilterQuery, Model } from 'mongoose';



@Injectable()
export class EquipmentRepository {
    constructor(
        @InjectModel(Repair.name) 
        private equipmentModel: Model<RepairDocument> ) { }


    async create(equipment: Repair): Promise<Repair> {
        const newEquipment = new this.equipmentModel(equipment).save();
        return newEquipment;
    };

    async findOne(equipmentFilterQuery: FilterQuery<Repair>): Promise<Repair> {
        return this.equipmentModel.findOne(equipmentFilterQuery)
                    .populate({path: 'author', select: 'name'})
                    .populate('equipment')
                    
    };



    async findAll(equipmentFilterQuery: FilterQuery<Repair>): Promise<Repair[]> {
        return  this.equipmentModel.find(equipmentFilterQuery)
                    .populate({path: 'author', select: 'name'})
                    .populate('equipment')
                    .sort({dateRepairStart: -1});
    };

    async findAndModify(equipmentFilterQuery: FilterQuery<Repair>, 
                        equipment: Partial<Repair>): Promise<Repair> {
       
        // todo change findOneAndUpdate to findAndModify 
        const options = { 
            returnOriginal: false
        };
        return this.equipmentModel.findOneAndUpdate(equipmentFilterQuery, equipment, options);
    };


    // todo нужно ли??
    async remove(equipmentFilterQuery: FilterQuery<Repair>): Promise<Repair> {
        const options = {
            rawResult: true
        }

        return this.equipmentModel.findOneAndDelete(equipmentFilterQuery, options);
    };




    



  
}


import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Equipment, EquipmentDocument } from './schema/equipment.schema';
import { FilterQuery, Model } from 'mongoose';



@Injectable()
export class EquipmentRepository {
    constructor(
        @InjectModel(Equipment.name) 
        private equipmentModel: Model<EquipmentDocument> ) { }


    async create(equipment: Equipment): Promise<Equipment> {
        const newEquipment = new this.equipmentModel(equipment).save();
        return newEquipment;
    };

    async findOne(equipmentFilterQuery: FilterQuery<Equipment>): Promise<Equipment> {
        return this.equipmentModel.findOne(equipmentFilterQuery)
                    .populate({path: 'author', select: 'name'})
                    .populate({path: 'equipment', select: 'position'});
    };



    async findAll(equipmentFilterQuery: FilterQuery<Equipment>): Promise<Equipment[]> {
        return  this.equipmentModel.find(equipmentFilterQuery)
                    .populate({path: 'author', select: 'name'})
                    .populate({path: 'equipment', select: 'position'})
                    .sort({_id: -1});
    };

    async findAndModify(equipmentFilterQuery: FilterQuery<Equipment>, 
                        equipment: Partial<Equipment>): Promise<Equipment> {
       
        // todo change findOneAndUpdate to findAndModify 
        const options = { 
            returnOriginal: false
        };
        return this.equipmentModel.findOneAndUpdate(equipmentFilterQuery, equipment, options);
    };


    // todo нужно ли??
    async remove(equipmentFilterQuery: FilterQuery<Equipment>): Promise<Equipment> {
        const options = {
            rawResult: true
        }

        return this.equipmentModel.findOneAndDelete(equipmentFilterQuery, options);
    };




    



  
}


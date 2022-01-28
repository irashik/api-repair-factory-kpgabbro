import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';
import { UnitEquipment } from 'src/unit-equipment/schema/unitEquipment.schema';



//todo  переименовать бы ее в Repair...

export type EquipmentDocument = Equipment & Document;


@Schema({strict: false})
export class Equipment {
    
    _id?: Types.ObjectId
    
    @Prop()
    dateRepairStart: Date;

    @Prop()
    dateRepairEnd: Date;

    @Prop({required: true, type:[{type: MongooseSchema.Types.ObjectId, ref: "UnitEquipment"}]})
    equipment: UnitEquipment;  
       
    @Prop(raw([{
        description: {type: String},
        type: {type: String, enum: ['CHORES', 'INSPECTION', 'SERVICE', 'REPAIR', 'RELINING']}
    }]))

    repair: [{
        description: string,
        type: String, enum: ['CHORES', 'INSPECTION', 'SERVICE', 'REPAIR', 'RELINING']
    }]


    

    @Prop({required: true, type:[{type: MongooseSchema.Types.ObjectId, ref: "User"}]})
        author: User;
   
    @Prop(raw([{
        name: {type: String},
        value: {type: Number},
        description: {type: String}

    }]))
    material: [{
        name: string,
        value: number,
        description: string
    }];
   
};



export const EquipmentSchema = SchemaFactory.createForClass(Equipment);

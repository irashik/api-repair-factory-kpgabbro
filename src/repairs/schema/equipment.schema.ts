import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { User } from '@App/users/schema/user.schema';
import { UnitEquipment } from '@App/unit-equipment/schema/unitEquipment.schema';



//todo  переименовать бы ее в Repair...

export type RepairDocument = Repair & Document;


@Schema({strict: false})
export class Repair {
    
    _id?: Types.ObjectId
    
    @Prop()
    dateRepairStart: Date;

    @Prop()
    dateRepairEnd: Date;

    @Prop({required: true, type:[{type: MongooseSchema.Types.ObjectId, ref: "UnitEquipment"}]})
    equipment: UnitEquipment;  
       

    @Prop({required: true, type:[{type: MongooseSchema.Types.ObjectId, ref: "User"}]})
        author: User;





    @Prop(raw([{
        description: {type: String},
        type: {type: String, enum: ['CHORES', 'INSPECTION', 'SERVICE', 'REPAIR', 'RELINING']} // хоз работы; осмотр; обслуживание; ремонт; перефутеровка 
        

    }]))

    repair: [{
        description: string,
        type: String, enum: ['CHORES', 'INSPECTION', 'SERVICE', 'REPAIR', 'RELINING']
    }]

    

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



export const RepairSchema = SchemaFactory.createForClass(Repair);

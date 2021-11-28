
import { Document, Schema as MongooseSchema, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { User } from 'src/users/schema/user.schema';
import { UnitEquipment } from 'src/unit-equipment/schema/unitEquipment.schema';
import { MediaTypeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';



// переименовать бы ее в Repair...

export type EquipmentDocument = Equipment & Document;


@Schema({strict: false})
export class Equipment {
    
    @Prop()
    dateRepairStart: Date;

    @Prop()
    dateRepairEnd: Date;

    //@Prop({required: true, type:[{type: MongooseSchema.Types.ObjectId, ref: "UnitEquipment"}]})
    //equipment: UnitEquipment | Types.ObjectId[] | null;  
    @Prop()
    equipment: String;
    

    // описание ремонтов на опред. дату, массив строк
    @Prop([String])
    repair: string[];
   

    // @Prop({required: true, type:[{type: MongooseSchema.Types.ObjectId, ref: "User"}]})
    //     user: User | Types.ObjectId[] | null;
    @Prop()
    author: string;

    @Prop()
    spendingJob: number;
   

    @Prop(raw([{
        name: {type: String},
        value: {type: Number},
        description: {type: String}

    }]))
    material: [{
        name: string,
        value: number,
        description: string

        
    }]
   
}



export const EquipmentSchema = SchemaFactory.createForClass(Equipment);

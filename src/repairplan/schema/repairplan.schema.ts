
import { Document, Schema as MongooseSchema, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Type } from 'class-transformer';


import { User } from 'src/users/schema/user.schema';
import { UnitEquipment } from 'src/unit-equipment/schema/unitEquipment.schema';
import { MediaTypeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { CANCELLED } from 'dns';

/* каждая запись о планируемом ремонте оборудования будет в этой коллекции
        
*/


export type RepairPlanDocument = RepairPlan & Document;


@Schema()
export class RepairPlan {
    
    @Prop()
    dateCreated: Date;

    @Prop()
    dateFinished: Date;

    //@Prop({required: true, type:[{type: MongooseSchema.Types.ObjectId, ref: "UnitEquipment"}]})
    //equipment: UnitEquipment | Types.ObjectId[] | null;  
        @Prop()
        equipment: String;
    

    //    @Prop({required: true, type:[{type: MongooseSchema.Types.ObjectId, ref: "User"}]})
    //    user: User | Types.ObjectId[] | null;
    @Prop()
    author: string;


   @Prop([String])
   description: string[];
   
   
   // выполнено, отменено, отложено, черновик
   @Prop({type: String, enum: ['FINISHED','CANCELLED', 'DRAFT', 'DEFERRED', 'INWORK'] })
   //status: statusType; // ТАК НЕ РАБОТАЕТ.
   //@Prop()
   status: string;
//    FINISHED = "Выполнено",
//    CANCELLED = "Отменено",
//    DRAFT = "Черновик",
//    DEFERRED = "Отложено",
//    INWORK = "В работе"


    @Prop()
    comment: string;


    // трудозатраты человеко * час.
    @Prop()
    spendingJob: number;

    @Prop()
    priority: string;

       

    @Prop(raw([{
        nameMaterial: {type: String},
        valueMaterial: {type: Number},
        descriptionMaterial: { type: String},
        
    }]))
    materialPlan: [{
        nameMaterial: string,
        valueMaterial: number,
        descriptionMaterial: string
        
    }]
  

}



export const RepairPlanSchema = SchemaFactory.createForClass(RepairPlan);


enum statusType {
    FINISHED = "Выполнено",
    CANCELLED = "Отменено",
    DRAFT = "Черновик",
    DEFERRED = "Отложено",
    INWORK = "В работе"
}
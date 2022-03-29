import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { User } from '@App/users/schema/user.schema';
import { UnitEquipment } from '@App/unit-equipment/schema/unitEquipment.schema';


export type RepairPlanDocument = RepairPlan & Document;


@Schema()
export class RepairPlan {
    
    _id?: Types.ObjectId

    @Prop()
    dateCreated: Date;

    @Prop()
    dateFinished: Date; // date change status

    @Prop({required: true, type:[{type: MongooseSchema.Types.ObjectId, ref: "UnitEquipment"}]})
    equipment: UnitEquipment;  
    
    @Prop({required: true, type:[{type: MongooseSchema.Types.ObjectId, ref: "User"}]})
    author: User;
    
    @Prop([String])
    description: string[];
   
   
    @Prop({type: String, enum: ['FINISHED','CANCELLED', 'DRAFT', 'DEFERRED', 'INWORK', 'ACTIVE'] })
    status: string;

    @Prop()
    comment: string;

    @Prop()
    spendingJob: number;

    @Prop()
    priority: string;
      


}



export const RepairPlanSchema = SchemaFactory.createForClass(RepairPlan);


enum statusType {
    FINISHED = "Выполнено",
    CANCELLED = "Отменено",
    DRAFT = "Черновик",
    DEFERRED = "Отложено",
    INWORK = "В работе",
    ACTIVE = "Активная"

}
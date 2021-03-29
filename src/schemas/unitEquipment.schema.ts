
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

/* 
схемы для 
коллекции списка оборудования 
*/


export type UnitEquipmentDocument = UnitEquipment & Document;

    @Schema()
    export class UnitEquipment {

        @Prop()
        name: string;

        @Prop()
        description: string;

        
    }
        
   export const UnitEquipmentSchema = SchemaFactory.createForClass(UnitEquipment);

   




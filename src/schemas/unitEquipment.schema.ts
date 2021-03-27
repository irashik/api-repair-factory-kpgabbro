
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

/* 
схемы для 
коллекции списка оборудования 
*/


export type UnitEquipmentSchema = UnitEquipment & Document;
    @Schema()
    export class UnitEquipment {
        @Prop()
        Equipment: string;
        
    }
        
   export const UnitEquipmentSchema = SchemaFactory.createForClass(UnitEquipment);

   




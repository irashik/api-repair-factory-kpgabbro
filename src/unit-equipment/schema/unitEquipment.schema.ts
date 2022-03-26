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
        position: string

        @Prop()
        description: string;

        @Prop()
        group: string;

        @Prop()
        alias: string;

        
        

        
    }
        
   export const UnitEquipmentSchema = SchemaFactory.createForClass(UnitEquipment);

   




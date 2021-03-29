
import * as mongoose from 'mongoose';

import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Type } from 'class-transformer';

/* каждая еденица оборудования будет коллекция, и каждая коллекция сохраняется по этой схеме
впрочем кроме коллекции списка оборудования и коллекции прочие работы.
*/


export type EquipmentDocument = Equipment & Document;




@Schema()
export class Equipment {

    @Prop({default: Date.now})
    dateRepair: Date;
    
    // описание ремонтов на опред. дату, массив строк
    @Prop([String])
    repair: string[];
   

    // сделай в таком виде
    // @Type(() => CreateRepairPlanDto)
    // readonly repairplan: CreateRepairPlanDto[];




    @Prop(raw([{
         description: { type: String},
         finish: { type: Boolean, default: false},
         dateFinish: { type: Date}
        
     }]))
     repairPlan: [{
        description: string;
        finish: boolean;
        dateFinish: Date;
     }]

    @Prop(raw([{
        nameMaterial: {type: String},
        valueMaterial: {type: Number}

    }]))
    material: [{
        nameMaterial: string,
        valueMaterial: number
        
    }]


    @Prop(raw([{
        nameMaterial: {type: String},
        valueMaterial: {type: Number},
        finish: { type: Boolean, default: false},
        dateFinish: { type: Date }

    }]))
    materialPlan: [{
        nameMaterial: string,
        valueMaterial: number,
        finish: boolean,
        dateFinish: Date
        
    }]

   

    @Prop()
    author: string;
    

}

//todo !!
// class CreateRepairPlanDto {

//     @Prop()
//     description: string;

//     @Prop()
//     finish: boolean;

//     @Prop()
//     datefinish: Date;
        
// }


export const EquipmentSchema = SchemaFactory.createForClass(Equipment);


















// export const EquipmentSchema = new mongoose.Schema({
    
//     Daterepair: {
//         type: Date,
//         required: true,
        
//     },
//     Repair: [{
//         type: String,
        
//     }],
//     Material: [{
//         NameMaterial: {
//             type: String,
//         },
//         ValueMaterial: {
//             type: Number,
//         }
//     }],
//     RepairPlan: [{
//         Desctiption: {
//             type: String
//         },
//         Finish: {
//             type: Boolean
//         },
//         DateFinish: {
//             type: Date
//         }

//     }],
//     MaterialPlan: [{
//         NameMaterial: {
//             type: String,
//         },
//         ValueMaterial: {
//             type: Number,
//         },
//         Finish: Boolean,
//         DateFinish: Date
//     }],

//     Author: {
//         type: String
//     },
    



// })
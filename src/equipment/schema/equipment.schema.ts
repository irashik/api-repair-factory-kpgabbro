
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

    @Prop({required: true})
    equipment: string;
    
    // описание ремонтов на опред. дату, массив строк
    @Prop([String])
    repair: string[];
   
    @Prop()
    author: string;




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

   

    

}



export const EquipmentSchema = SchemaFactory.createForClass(Equipment);







//todo !!
// class CreateRepairPlanDto {

//     @Prop()
//     description: string;

//     @Prop()
//     finish: boolean;

//     @Prop()
//     datefinish: Date;
        
// }



// сделай в таком виде
    // @Type(() => CreateRepairPlanDto)
    // readonly repairplan: CreateRepairPlanDto[];

import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsString, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class CreateEquipmentDto {

    @IsNotEmpty()
    @IsDate()
    readonly dateRepairStart: Date;

    @IsDate()
    readonly dateRepairEnd: Date;

    @IsNotEmpty()
    @IsString()
    readonly equipment: string;

    @IsNotEmpty()
    @IsArray()
    readonly repair: string[];
    
    
    @IsNotEmpty()
    @IsString()
    readonly author: string;


    // todo добавь валидацию и как проверить вложенные объекты?
    readonly repairPlan: any;
    
    readonly material: any;
    
    readonly materialPlan: any;


    

}










// // MaterialPlan: [{
// //     NameMaterial: {
// //         type: String,
// //     },
// //     ValueMaterial: {
// //         type: Number,
// //     },
// //     Finish: Boolean,
// //     DateFinish: Date
// // }],



import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsString, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class CreateEquipmentDto {

    @IsNotEmpty()
    @IsDate()
    readonly dateRepair: Date;

    @IsNotEmpty()
    @IsArray()
    readonly repair: string[];
    
    
    readonly repairPlan: any;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

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



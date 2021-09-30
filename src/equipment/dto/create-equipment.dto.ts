import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsObject, IsString, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UnitEquipment } from 'src/unit-equipment/schema/unitEquipment.schema';
import { User } from 'src/users/schema/user.schema';



export class CreateEquipmentDto {

    @IsNotEmpty()
    @IsDate()
    readonly dateRepairStart: Date;

    @IsDate()
    readonly dateRepairEnd: Date;

    @IsNotEmpty()
    @IsString()
    //readonly equipment: UnitEquipment;
        equipment: string;

    @IsNotEmpty()
    @IsArray()
    readonly repair: string[];
    
    
    @IsNotEmpty()
    @IsString()
    //readonly user: User;
    readonly author: string;
   
    @IsObject()
    readonly material: any;

    readonly spendingJob: number;
    

   
}




// как проверить вложенные?

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



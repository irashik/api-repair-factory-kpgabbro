import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsObject, IsString, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UnitEquipment } from 'src/unit-equipment/schema/unitEquipment.schema';
import { User } from 'src/users/schema/user.schema';



export class CreateRepairPlanDto {

    @IsNotEmpty()
    @IsDate()
    readonly dateCreated: Date;

    @IsDate()
    readonly dateFinished: Date;

    @IsNotEmpty()
    @IsString()
    //readonly equipment: UnitEquipment;
    equipment: string;

    @IsNotEmpty()
    @IsString()
   //readonly user: User;
    readonly author: string;

    @IsNotEmpty()
    @IsArray()
    readonly description: string[];
    
    readonly status: statusType;

    readonly comment: string;

    readonly spendingJob: number;

    
    readonly priority: string;

  
    @IsObject()
    readonly materialPlan: any;


    

}



enum statusType {
    FINISHED = "Выполнено",
    CANCELLED = "Отменено",
    DRAFT = "Черновик",
    DEFERRED = "Отложено"
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



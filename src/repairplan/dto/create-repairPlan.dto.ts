import { IsArray, IsBoolean, IsDate, IsEnum, IsIn, IsNotEmpty, IsObject, IsString, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UnitEquipment } from 'src/unit-equipment/schema/unitEquipment.schema';
import { User } from 'src/users/schema/user.schema';



enum statusType {
    FINISHED = "Выполнено",
    CANCELLED = "Отменено",
    DRAFT = "Черновик",
    DEFERRED = "Отложено",
    INWORK = "В работе"
}


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
   
    
    readonly status: string; // потому что ниже код не работает. Но ограничение по схеме.
    
    // @IsIn(['FINISHED','CANCELLED', 'DRAFT', 'DEFERRED', 'INWORK'])
    // //@IsEnum(statusType)
    // @ApiProperty({
    //     description: "description of the status",
    //     enum: statusType
    // })
    // status: statusType;
    
    // FINISHED = "Выполнено",
    // CANCELLED = "Отменено",
    // DRAFT = "Черновик",
    // DEFERRED = "Отложено",
    // INWORK = "В работе"


    readonly comment: string;

    readonly spendingJob: number;

    
    readonly priority: string; // тоже наверное нужно задать энумератор

    @IsNotEmpty()
    @IsArray()
    readonly description: string[];
  
    @IsObject()
    readonly materialPlan: any;

    // materialPlan: [{
    //     nameMaterial: string,
    //     valueMaterial: number,
    //     descriptionMaterial: string
    

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



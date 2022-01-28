import { IsArray, IsBoolean, IsDate, IsDateString, IsNotEmpty, IsObject, IsString, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UnitEquipment } from 'src/unit-equipment/schema/unitEquipment.schema';
import { User } from 'src/users/schema/user.schema';



export class CreateEquipmentDto {

    @IsNotEmpty()
    @IsDate()
    //@IsDateString()
    readonly dateRepairStart: Date;

    @IsDate()
    readonly dateRepairEnd: Date;

    @IsNotEmpty()
    @IsString()
    readonly equipment: UnitEquipment;


    @IsArray()
    readonly repair: any;
    
    
    @IsNotEmpty()
    readonly author: User;
   

    @IsArray()
    readonly material: any;

    

   
}


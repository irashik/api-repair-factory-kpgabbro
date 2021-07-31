import { IsNotEmpty } from "class-validator";

export class CreateUnitEquipmentDto {


    @IsNotEmpty()
    readonly position: string;

    @IsNotEmpty()
    readonly group: string;

    readonly description: string;
   
    readonly name: string;
}

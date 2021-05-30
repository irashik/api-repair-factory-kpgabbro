import { IsNotEmpty } from "class-validator";

export class CreateUnitEquipmentDto {


    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly group: string;

    readonly description: string;
}

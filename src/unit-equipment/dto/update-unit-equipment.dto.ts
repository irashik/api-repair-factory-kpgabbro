import { PartialType } from '@nestjs/mapped-types';
import { CreateUnitEquipmentDto } from './create-unit-equipment.dto';

export class UpdateUnitEquipmentDto extends PartialType(CreateUnitEquipmentDto) {


    
    
}

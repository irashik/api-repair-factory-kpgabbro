import { PartialType } from '@nestjs/mapped-types';
import { CreateRepairDto } from './create-equipment.dto';

export class UpdateRepairDto extends PartialType(CreateRepairDto) {

    
}

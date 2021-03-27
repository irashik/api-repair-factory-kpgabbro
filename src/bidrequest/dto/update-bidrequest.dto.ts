import { PartialType } from '@nestjs/mapped-types';
import { CreateBidrequestDto } from './create-bidrequest.dto';
import { IsNotEmpty, IsBoolean, IsDate } from 'class-validator';



export class UpdateBidrequestDto extends PartialType(CreateBidrequestDto) {

    

    @IsBoolean()
    readonly performed: boolean;

    @IsDate()
    readonly performedDate: Date;

    @IsBoolean()
    readonly inwork: boolean;

    @IsDate()
    readonly inworkDate: Date;

    


}

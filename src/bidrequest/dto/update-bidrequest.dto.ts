import { PartialType } from '@nestjs/mapped-types';
import { CreateBidrequestDto } from './create-bidrequest.dto';
import { IsNotEmpty, IsBoolean, IsDate, IsDateString } from 'class-validator';



export class UpdateBidrequestDto extends PartialType(CreateBidrequestDto) {

    


//    @IsDate()
    @IsDateString()
    readonly dateStatusBid: Date;


    readonly lastAuthor: string;

}

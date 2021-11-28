import { PartialType } from '@nestjs/mapped-types';
import { CreateBidrequestDto } from './create-bidrequest.dto';
import { IsNotEmpty, IsBoolean, IsDate } from 'class-validator';



export class UpdateBidrequestDto extends PartialType(CreateBidrequestDto) {

    


    @IsDate()
    readonly dateStatusBid: Date;


    readonly lastAuthor: string;

}

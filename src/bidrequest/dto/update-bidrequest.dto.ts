import { PartialType } from '@nestjs/mapped-types';
import { CreateBidrequestDto } from './create-bidrequest.dto';
import { IsNotEmpty, IsBoolean, IsDate, IsDateString } from 'class-validator';
import { User } from '@App/users/schema/user.schema';



export class UpdateBidrequestDto extends PartialType(CreateBidrequestDto) {

    

}

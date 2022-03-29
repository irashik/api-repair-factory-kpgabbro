import { PartialType } from '@nestjs/mapped-types';
import { CreateBidrequestDto } from './create-bidrequest.dto';




export class UpdateBidrequestDto extends PartialType(CreateBidrequestDto) {

    

}

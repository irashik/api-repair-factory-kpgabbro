import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {



    
     @IsBoolean()
     admin: boolean;

     @IsBoolean()
     verifed: boolean;

     @IsBoolean()
     confirmation: boolean;

     role: string;



    
}

import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {



    // @IsString()
    // @IsNotEmpty()
    // readonly name: string;

    // @IsString()
    // @IsNotEmpty()
    // readonly email: string;

    // @IsString()
    // @IsNotEmpty()
    // readonly password:  string;

    // @IsString()
    // readonly position: string;

    // @IsString()
    // readonly salt: string;

    // @IsBoolean()
    // readonly admin: boolean;

    // @IsBoolean()
    // readonly verifed: boolean;

    // @IsBoolean()
    // readonly confirmation: boolean;

    // @IsDate()
    // readonly created: Date;


    
}

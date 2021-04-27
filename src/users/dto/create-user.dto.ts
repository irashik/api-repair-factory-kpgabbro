
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsString, } from 'class-validator';




export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    password:  string;

    @IsString()
    readonly position: string;

    @IsString()
    salt: string;

    @IsBoolean()
    admin: boolean;

    @IsBoolean()
    verifed: boolean;

    @IsBoolean()
    confirmation: boolean;

    @IsDateString()
    created: Date;

    


}

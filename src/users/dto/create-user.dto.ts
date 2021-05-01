
import { IsBoolean, IsDate, IsDateString, IsEmail, IsEmpty, IsNotEmpty, IsString, ValidateIf, } from 'class-validator';




export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    password:  string;

    
    @ValidateIf(val => val.position === '' )
    @IsString()
    position: string;

    //@IsBoolean()
    @IsEmpty()
    admin: boolean;

    @IsEmpty()
    //@IsBoolean()
    verifed: boolean;

    @IsEmpty()
    //@IsBoolean()
    confirmation: boolean;

    @IsEmpty()
    //@IsDateString()
    created: Date;

    


}

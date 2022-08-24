
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

    
    @IsString()
    position: string;
    

    @IsEmpty()
    //@IsDateString()
    created: Date;

// ниже поля наверное можно убрать, при создании они не нужны.... ?

    //@IsBoolean()
    
    admin: boolean;

    
    //@IsBoolean()
    verifed: boolean;

    
    //@IsBoolean()
    confirmation: boolean;

    role: string
    

   

    


}

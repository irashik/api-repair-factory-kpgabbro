import { User } from "@App/users/schema/user.schema";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";



export class CreateUserTokenDto {

    @IsNotEmpty()
    @IsString()
    readonly token: string;

    readonly issuer: string;

   
    @IsNotEmpty()
    @IsString()
    readonly sub: string;

    @IsNotEmpty()
    @IsDateString()
    readonly expiresIn: number;

    readonly iat: number; // время в которое выдан
    
    readonly audience: string; // аудитория. определяет получателей



}
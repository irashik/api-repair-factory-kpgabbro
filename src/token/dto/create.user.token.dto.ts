import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import * as mongoose from "mongoose";


export class CreateUserTokenDto {

    @IsNotEmpty()
    @IsString()
    readonly token: string;

    readonly issuer: string;

   
    @IsNotEmpty()
    @IsString()
    readonly sub: mongoose.Types.ObjectId;

    @IsNotEmpty()
    @IsDateString()
    readonly expiresIn: number;

    readonly iat: number; // время в которое выдан
    
    readonly audience: string; // аудитория. определяет получателей



}
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import * as mongoose from "mongoose";


export class CreateUserTokenDto {

    @IsNotEmpty()
    @IsString()
    readonly token: string;

    @IsNotEmpty()
    @IsString()
    readonly uId: mongoose.Types.ObjectId;

    @IsNotEmpty()
    @IsDateString()
    readonly expireAt: string;


}
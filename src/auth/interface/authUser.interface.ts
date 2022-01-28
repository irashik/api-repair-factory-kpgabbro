import { ObjectId } from "mongodb";

export interface IAuthUser {
    userName: string;
    userId: ObjectId;
}


export interface IAuthUserResponse extends IAuthUser {
    accessToken: string;
    refreshToken: string;
    status: number;    
}

export interface IAuthUser {
    userName: string;
    userId: string;
}


export interface IAuthUserResponse extends IAuthUser {
    accessToken: string;
    refreshToken: string;
    status: number;    

}
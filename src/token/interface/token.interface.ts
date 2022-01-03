export interface IToken {
    _id: string;
    token: string;
    issuer: string;
    sub: string; //id user
    expiresIn: number;
    iat: number;
    audience: string;
}
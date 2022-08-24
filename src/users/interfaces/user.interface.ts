export interface IUserRecord {
    _id?: string;
    email: string;
    name: string;
    password: string;
    position?: string;
    admin?: boolean;
    verifed: boolean;
    confirmation: boolean;
    created?: Date
    role: string

}




export interface ICreateUser {
    
    email: string;
    name: string;
    password: string;
    position?: string;
    created?: Date;
    

}
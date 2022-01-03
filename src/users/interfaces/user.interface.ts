export interface IUser {
    _id: string;
    email: string;
    name: string;
    password: string;
    position?: string;
    admin?: boolean;
    verifed: boolean;
    confirmation: boolean;
    created?: Date

}
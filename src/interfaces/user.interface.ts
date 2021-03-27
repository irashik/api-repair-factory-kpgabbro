import { Document } from 'mongoose';

export interface User extends Document {
    readonly Name: string;
    readonly Email: string;
    readonly Password:  string;
    readonly Position: string;
    readonly Salt: String;
    readonly Admin: Boolean;
    readonly Verifed: Boolean;
    readonly Confirmation: Boolean;
    readonly Created: Date;
}


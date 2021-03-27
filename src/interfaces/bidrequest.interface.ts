import { Document } from 'mongoose';

export interface BidRequestInterface extends Document {

    readonly name: string;
    readonly date: Date;
    readonly author:  string;
    readonly performed: string;
    readonly performedDate: Date;
    
}



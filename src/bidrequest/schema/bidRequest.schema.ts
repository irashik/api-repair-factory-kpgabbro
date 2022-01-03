
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';


/* 
схемы для 
заявок
*/


export type BidRequestDocument = BidRequest & Document;

@Schema()
export class BidRequest {

    @Prop({required: true})
    description: string;

    @Prop({default: Date.now})
    dateCreated: Date;

    @Prop()
    author: string;
    

    @Prop()
    priority: string;

    @Prop()
    category: string;

    @Prop()
    comment: string;

    @Prop({type: String, enum: ['FINISHED',
                    'CANCELLED', 'DRAFT', 'DEFERRED', 'INWORK', 'ACTIVE'] })
    statusBid: string;

    
    @Prop()
    dateStatusBid: Date;


    @Prop()
    lastAuthor: string;
    

}
    
export const BidRequestSchema = SchemaFactory.createForClass(BidRequest);




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
    name: string;

    @Prop()
    date: Date;

    @Prop()
    author: string;

    @Prop()
    performed: boolean;

    @Prop()
    performedDate: Date;

    @Prop()
    inwork: boolean;

    @Prop()
    inworkDate: Date;

    

}
    
export const BidRequestSchema = SchemaFactory.createForClass(BidRequest);



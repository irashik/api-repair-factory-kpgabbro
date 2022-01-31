import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from 'src/users/schema/user.schema';


export type BidRequestDocument = BidRequest & Document;

@Schema()
export class BidRequest {

    _id?: Types.ObjectId

    @Prop({required: true})
    description: string;

    @Prop()
    dateCreated: Date;

    @Prop({required: true, type:[{type: MongooseSchema.Types.ObjectId, ref: "User"}]})
    author: User;

    @Prop()
    priority: string;

    @Prop()
    category: string;

    @Prop()
    comment: string;

    @Prop({type: String, enum: ['FINISHED', 'CANCELLED', 'DRAFT', 'DEFERRED', 'INWORK', 'NEW'] })
    statusBid: string;
    
    @Prop()
    dateStatusBid: Date;

    @Prop({required: false, type:[{type: MongooseSchema.Types.ObjectId, ref: "User"}]})
    lastAuthor: User;
    

}
    
export const BidRequestSchema = SchemaFactory.createForClass(BidRequest);



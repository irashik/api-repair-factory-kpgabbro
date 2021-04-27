import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, } from 'mongoose';
import { User } from '../../users/schema/user.schema';


export type TokenDocument = Token & Document;

@Schema()
export class Token {
    
    @Prop({required: true})
    token: string;

    @Prop({required: true, type: [{type: MongooseSchema.Types.ObjectId, ref: 'User'}] })
    uId: User;

    @Prop({required: true})
    expireAt: Date;
    
}

export const TokenSchema = SchemaFactory.createForClass(Token);


// todo нужен ли здесь создание индекса и правильно ли??
//TokenSchema.index({token: 1, uId: 1}, {unique: true});






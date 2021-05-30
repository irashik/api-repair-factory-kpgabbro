import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, } from 'mongoose';
import { User } from '../../users/schema/user.schema';


export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
    
    @Prop({required: true, unique: true})
    token: string;

    @Prop()
    issuer: string;
      
    @Prop({required: true, type: [{type: MongooseSchema.Types.ObjectId, ref: 'User'}] })
    sub: User;

    @Prop({required: true})
    expiresIn: number;

    @Prop({required: true})
    iat: number;

    @Prop()
    audience: string;
    
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);


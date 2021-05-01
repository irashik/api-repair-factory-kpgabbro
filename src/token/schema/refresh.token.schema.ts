import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, } from 'mongoose';
import { User } from '../../users/schema/user.schema';


export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
    
    @Prop({required: true, unique: true})
    token: string;

    @Prop({required: true, type: [{type: MongooseSchema.Types.ObjectId, ref: 'User'}] })
    userId: User;

    @Prop({required: true})
    exp: Date;

    @Prop()
    clientId: string;

    @Prop()
    ipAddress: string;

    @Prop()
    createdAt: Date;
 

    
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);







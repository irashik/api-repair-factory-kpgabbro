import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { Document, Types } from 'mongoose';

/*
Схема для аккаунтов
*/
    
export type UserDocument = User & Document;



@Schema()
export class User {

    _id: Types.ObjectId


    @IsEmail()
    @Prop({required: true, unique: true})
    email: string;
    
    @Prop({required: true})
    password: string;
    
    @Prop({required: true})
    name: string;
    
    @Prop()
    position: string;
    
    @Prop({default: false})
    admin: boolean;

    @Prop({ default: false})
    verifed: boolean;
    
    @Prop({default: false})
    confirmation: boolean;
    
    @Prop({default: Date.now})
    created: Date;
    
}
    


export const UserSchema = SchemaFactory.createForClass(User);

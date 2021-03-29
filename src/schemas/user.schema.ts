
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/*
Схема для аккаунтов
*/
    
export type UserDocument = User & Document;



@Schema()
export class User {



    @Prop({required: true, unique: true})
    email: string;
    
    @Prop({required: true})
    password: string;
    
    @Prop({required: true})
    name: string;
    
    @Prop()
    position: string;
    
    @Prop()
    salt: string;
    
    @Prop()
    admin: boolean;

    @Prop()
    verifed: boolean;
    
    @Prop()
    confirmation: boolean;
    
    @Prop()
    created: Date;
    
}
    


export const UserSchema = SchemaFactory.createForClass(User);

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Condition } from 'mongodb';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { CreateUserTokenDto } from './dto/create.user.token.dto';
import { TokenDocument } from './schema/token.schema';
import { TokenRepository } from './token.repository';


// todo желательно сделать repository class для взаимодействия с бд

@Injectable()
export class TokenService {
    constructor(
        @InjectModel('Token')
        private readonly tokenRepository: TokenRepository) { }

    async create(createUserTokenDto: CreateUserTokenDto): Promise<TokenDocument> {
        
        return this.tokenRepository.create(createUserTokenDto);

        
    }

    async delete(uId: Condition<User>, token: string): Promise<boolean> {
        
        const token_obj =  await this.tokenRepository.deleteOne({ uId, token });

        return false;
    }

    async deleteAll(uId: Condition<User>):Promise<boolean> {

        const result =  await this.tokenRepository.deleteMany({uId});


       return (result.ok === 1) ? true : false;
        

    }

    async exists(uId: Condition<User>, token: string): Promise<boolean> {

        const token_obj = await this.tokenRepository.findOne({ uId, token });

        return (token_obj !== null) ? true : false;

    }

}

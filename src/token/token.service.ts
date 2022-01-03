import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Condition } from 'mongodb';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { CreateUserTokenDto } from './dto/create.user.token.dto';
import { RefreshToken } from './schema/refresh.token.schema';
import { TokenRepository } from './token.repository';


// todo желательно сделать repository class для взаимодействия с бд

@Injectable()
export class TokenService {
    constructor(
        @InjectModel('Token')
        private readonly tokenRepository: TokenRepository
        ) { }



    async create(createUserTokenDto: CreateUserTokenDto): Promise<RefreshToken> {
        return this.tokenRepository.create(createUserTokenDto);
    }

    async delete(token: string): Promise<boolean> {
        const result: any =  await this.tokenRepository.deleteOne({ token });

        return (result.ok === 1) ? true : false;

    }

    async deleteAll(uId: Condition<User>):Promise<boolean> {
        try {
            const result =  await this.tokenRepository.deleteMany({sub: uId});
            Logger.log('deleteAll tokenService =' + JSON.stringify(result) + "### uId== " + uId);
            
            const response = (result.ok === 1) ? Promise.resolve(true) : Promise.reject(false);
            return response;
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async exists(token: string): Promise<RefreshToken> {
        const token_obj = await this.tokenRepository.findOne({ token });
        return token_obj;

        
    }




    
}

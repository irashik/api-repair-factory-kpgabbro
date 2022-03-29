import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Condition } from 'mongodb';
import { User } from '@App/users/schema/user.schema';
import { CreateUserTokenDto } from './dto/create.user.token.dto';
import { RefreshToken } from '@App/token/schema/refresh.token.schema';

import { TokenRepository } from '@App/token/token.repository';


@Injectable()
export class TokenService {
    constructor(
        //@InjectModel('Token') // почему так?
        private tokenRepository: TokenRepository
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
            const response = (result.deletedCount === 1) ? Promise.resolve(true) : Promise.reject(false);
            return response;
        } catch(e) {
            throw new NotFoundException()
        }
    }

    async exists(token: string): Promise<RefreshToken> {
        const token_obj = await this.tokenRepository.findOne({ token });
        return token_obj;

        
    }




    
};

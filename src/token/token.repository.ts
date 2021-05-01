import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AccessToken, AccessTokenDocument } from './schema/access.token.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserTokenDto } from "./dto/create.user.token.dto";





@Injectable()
export class TokenRepository {
    constructor(
        @InjectModel(AccessToken.name) 
        private readonly tokenModel: Model<AccessTokenDocument>
    ) { } 
    
    async create(createUserTokenDto: CreateUserTokenDto): Promise<TokenDocument> {
        const userToken = new this.tokenModel(createUserTokenDto);
        return await userToken.save();
    }

    async deleteOne(tokenFilterQuery: FilterQuery<Token>): Promise<Token> {
        return this.tokenModel.remove(tokenFilterQuery);
    }

    async deleteMany(tokenFilterQuery: FilterQuery<Token>): Promise<{ok?: number, n?: number, deletedCount?: number  }> {
        return await this.tokenModel.deleteMany(tokenFilterQuery);
    }

    async findOne(tokenFilterQuery: FilterQuery<Token>): Promise<Token> {
        return await this.tokenModel.findOne(tokenFilterQuery);
    }

    


    



  
}


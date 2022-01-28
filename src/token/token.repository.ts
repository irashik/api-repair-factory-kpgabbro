import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RefreshToken, RefreshTokenDocument } from './schema/refresh.token.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserTokenDto } from "./dto/create.user.token.dto";





@Injectable()
export class TokenRepository {
    constructor(
        @InjectModel(RefreshToken.name) 
        private tokenModel: Model<RefreshTokenDocument>
    ) { } 
    
    async create(createUserTokenDto: CreateUserTokenDto): Promise<RefreshToken> {
        const userToken = new this.tokenModel(createUserTokenDto);
        return await userToken.save();
    }

    async deleteOne(tokenFilterQuery: FilterQuery<RefreshToken>): Promise<RefreshToken> {
        return this.tokenModel.remove(tokenFilterQuery);
    }

    async deleteMany(tokenFilterQuery: FilterQuery<RefreshToken>): Promise<{ok?: number, n?: number, deletedCount?: number  }> {

        Logger.debug('repository tokenFilterQuery==' + JSON.stringify(tokenFilterQuery));
    

        return await this.tokenModel.deleteMany(tokenFilterQuery);
    }

    async findOne(tokenFilterQuery: FilterQuery<RefreshToken>): Promise<RefreshToken> {
        return await this.tokenModel.findOne(tokenFilterQuery);
    }

    


    



  
}


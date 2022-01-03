import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from './schema/user.schema';
import { FilterQuery, Model } from 'mongoose';




@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) 
        private readonly userModel: Model<UserDocument>
    ) 
    { }


    async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOne(userFilterQuery);
    }

    async findAndModify(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User> {
        // change findOneAndUpdate to findAndModify 
        const options = { 
            returnOriginal: false
        }

        return this.userModel.findOneAndUpdate(userFilterQuery, user, options);
        
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        

      
        return newUser.save();
        // TODO как вернуть ошибку от БД ? например если дубликат.  



    }



    


    



  
}


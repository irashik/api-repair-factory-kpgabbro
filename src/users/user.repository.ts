import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from '../schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';




@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<UserDocument> ) {

        }

    async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOne(userFilterQuery);
    }

    async findAll(userFilterQuery: FilterQuery<User>): Promise<User[]> {
        return this.userModel.find(userFilterQuery);

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
    }



    async remove(userFilterQuery: FilterQuery<User>): Promise<User> {
        //DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
        return this.userModel.remove(userFilterQuery);

    }


    



  
}


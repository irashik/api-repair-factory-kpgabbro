import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { BidRequest, BidRequestDocument } from '../schemas/bidRequest.schema';
import { FilterQuery, Model } from 'mongoose';



@Injectable()
export class BidRequestRepository {
    constructor(
        @InjectModel(BidRequest.name) 
        private bidRequestModel: Model<BidRequestDocument> ) {

        }

    async findOne(bidRequestFilterQuery: FilterQuery<BidRequest>): Promise<BidRequest> {
        return this.bidRequestModel.findOne(bidRequestFilterQuery);
    }

    async find(bidRequestFilterQuery: FilterQuery<BidRequest>): Promise<BidRequest[]> {
        return this.bidRequestModel.find(bidRequestFilterQuery);

    }

    async create(bidrequest: BidRequest): Promise<BidRequest> {
        const newBid = new this.bidRequestModel(bidrequest);
        return newBid.save();
    }

    async findAndModify(bidRequestFilterQuery: FilterQuery<BidRequest>, bidrequest: Partial<BidRequest>): Promise<BidRequest> {
        // change findOneAndUpdate to findAndModify 
        const options = { 
            returnOriginal: false
        }

        return this.bidRequestModel.findOneAndUpdate(bidRequestFilterQuery, bidrequest, options);
        
    }


    async remove(bidRequestFilterQuery: FilterQuery<BidRequest>): Promise<BidRequest> {
        return this.bidRequestModel.remove(bidRequestFilterQuery);

    }
}


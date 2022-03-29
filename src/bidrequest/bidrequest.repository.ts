import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BidRequest, BidRequestDocument } from './schema/bidRequest.schema';
import { FilterQuery, Model } from 'mongoose';


@Injectable()
export class BidRequestRepository {
    constructor(
        @InjectModel(BidRequest.name) 
        private bidRequestModel: Model<BidRequestDocument> ) {

        }

    async findOne(bidRequestFilterQuery: FilterQuery<BidRequestDocument>): Promise<BidRequest> {
        return this.bidRequestModel.findOne(bidRequestFilterQuery)
                    .populate({path: 'author', select: 'name'})
                    .populate({path: 'lastAuthor', select: 'name'});
    };

    async find(bidRequestFilterQuery: FilterQuery<BidRequestDocument>): Promise<BidRequest[]> {
        return this.bidRequestModel.find(bidRequestFilterQuery)
                    .populate({path: 'author', select: 'name'})
                    .populate({path: 'lastAuthor', select: 'name'})
                    .sort({_id: -1});
    };

    async create(bidrequest: BidRequest): Promise<BidRequest> {
        const newBid = new this.bidRequestModel(bidrequest);
        const result = newBid.save();
        return result;
    };

    async findAndModify(bidRequestFilterQuery: FilterQuery<BidRequestDocument>, bidrequest: Partial<BidRequest>): Promise<BidRequest> {
        // change findOneAndUpdate to findAndModify 
        const options = { 
            returnOriginal: false
        }

        return this.bidRequestModel.findOneAndUpdate(bidRequestFilterQuery, bidrequest, options);
    };


    async remove(bidRequestFilterQuery: FilterQuery<BidRequestDocument>): Promise<any> {
        const result = await this.bidRequestModel.deleteOne(bidRequestFilterQuery);
        const res = (result.deletedCount === 1) ? true : false;
        return res;

    };
};
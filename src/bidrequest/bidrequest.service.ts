import { Injectable, Logger } from '@nestjs/common';
import { BidRequest } from '@App/bidrequest/schema/bidRequest.schema';
import { CreateBidrequestDto } from './dto/create-bidrequest.dto';
import { UpdateBidrequestDto } from './dto/update-bidrequest.dto';
import { BidRequestRepository } from './bidrequest.repository';
import { ObjectId } from "mongodb";


@Injectable()
export class BidRequestService {
   constructor(private readonly bidRequestRepository: BidRequestRepository) 
   { }

  
  
  async create(createBidrequestDto: CreateBidrequestDto): Promise<BidRequest> {
    return await this.bidRequestRepository.create(createBidrequestDto);
    
  };

  async findAll(query: any): Promise<BidRequest[]> {

    let statusBid = query.statusBid;
    let category = query.category;
    let priority = query.priority;
    let description = query.description;
    let id = query.id;

    let options:any = {};


    //{$or: [{statusBid: {$ne: "DRAFT"}}, {statusBid: "DRAFT", author: ObjectId('60b3374fee1912c9909b9f50')}]}

    if(!statusBid) {
        options.$and = [{$or: [
            {"statusBid": {"$nin": ["FINISHED", "CANCELLED", "DEFERRED", "DRAFT"]}}, 
            {"statusBid": "DRAFT", "author": new ObjectId(id)}
          ]}]
    } else {
        if(statusBid === "DRAFT") {
          options.$and = [{"statusBid": statusBid}, {"author": new ObjectId(id)}]
        } else {
          options.$and = [{"statusBid": statusBid} ]
        }
    }
    if(category) {
      options.$and.push({"category": category})
    }
    if(priority) {
      options.$and.push({"priority": priority})
    }
    if(description) {
      options.$and.push({
        $text:{$search: description.toString()},
        scope: {$meta: "textScope"}
      })
    }




    Logger.log("options = " + JSON.stringify(options));

    try {
      return await this.bidRequestRepository.find(options);
    } catch (e) {
      throw new Error('exception repository find')
    }
  };
  async findOne(_id: string): Promise<BidRequest> {
    try {
      return await this.bidRequestRepository.findOne({ _id });
      
    } catch (e) {
      throw new Error('record not found');
    }

  };
  async update(id: string, updateBidrequestDto: UpdateBidrequestDto): Promise<BidRequest> {
    return await this.bidRequestRepository.findAndModify({ "_id": id }, updateBidrequestDto);

  };
  async remove(id: string): Promise<boolean> {
    return await this.bidRequestRepository.remove({ "_id": id});

  };
};

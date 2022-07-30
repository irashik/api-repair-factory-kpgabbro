import { Injectable } from '@nestjs/common';
import { BidRequest } from '@App/bidrequest/schema/bidRequest.schema';
import { CreateBidrequestDto } from './dto/create-bidrequest.dto';
import { UpdateBidrequestDto } from './dto/update-bidrequest.dto';
import { BidRequestRepository } from './bidrequest.repository';


@Injectable()
export class BidRequestService {
   constructor(private readonly bidRequestRepository: BidRequestRepository) 
   { }

  
  
  async create(createBidrequestDto: CreateBidrequestDto): Promise<BidRequest> {
    return await this.bidRequestRepository.create(createBidrequestDto);
    
  };

  async findAll(query: any): Promise<BidRequest[]> {

    let options:any = {};

    if(!query.statusBid) {

        options.$and = [
          {$or: [
            {"statusBid": {"$nin": ["FINISHED", "CANCELLED", "DEFERRED"]}}
          ]}
        ]
    } else {
        options.$and = [{"statusBid": query.statusBid}]
    }

    if(query.category) {
      options.$and.push({"category": query.category})
    }
    if(query.priority) {
      options.$and.push({"priority": query.priority})
    }

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

  }

  async update(id: string, updateBidrequestDto: UpdateBidrequestDto): Promise<BidRequest> {
    return await this.bidRequestRepository.findAndModify({ "_id": id }, updateBidrequestDto);

  }

  async remove(id: string): Promise<boolean> {
    return await this.bidRequestRepository.remove({ "_id": id});

  }
};

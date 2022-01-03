import { Injectable } from '@nestjs/common';
import { BidRequest } from 'src/bidrequest/schema/bidRequest.schema';
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

  async findAll(find: any): Promise<BidRequest[]> {

    // todo найди всех кроме тех, что выполнены
    try {
      return await this.bidRequestRepository.find(find);
    } catch (e) {
      throw new Error('')
    }



  }

  
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
}

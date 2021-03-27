import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BidRequest, BidRequestDocument } from 'src/schemas/bidRequest.schema';

import { BidRequestInterface } from '../interfaces/bidrequest.interface';

import { CreateBidrequestDto } from './dto/create-bidrequest.dto';
import { UpdateBidrequestDto } from './dto/update-bidrequest.dto';

import { BidRequestRepository } from './bidrequest.repository';


@Injectable()
export class BidRequestService {
   constructor(
       private readonly bidRequestRepository: BidRequestRepository) {}

  
  
  async create(createBidrequestDto: CreateBidrequestDto): Promise<BidRequest> {
    return this.bidRequestRepository.create(createBidrequestDto);
    
  };







  async findAll(): Promise<BidRequest[]> {
    return this.bidRequestRepository.find({});

  }

  
  async findOne(_id: string): Promise<BidRequest> {
    return this.bidRequestRepository.findOne({ _id });

  }

  async update(id: string, updateBidrequestDto: UpdateBidrequestDto) {
    return this.bidRequestRepository.findAndModify({ "_id": id }, updateBidrequestDto);

  }

  async remove(id: string) {
    return this.bidRequestRepository.remove({ "_id": id});

  }
}

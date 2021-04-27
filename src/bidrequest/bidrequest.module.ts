import { Module } from '@nestjs/common';
import { BidRequestService } from './bidrequest.service';
import { BidrequestController } from './bidrequest.controller';

import { MongooseModule } from '@nestjs/mongoose';

import { BidRequest, BidRequestSchema } from './schema/bidRequest.schema';
import { BidRequestRepository } from './bidrequest.repository';




@Module({
  imports: [
    MongooseModule.forFeature([{name: BidRequest.name, schema: BidRequestSchema }]),

  ],
  controllers: [BidrequestController],
  providers: [BidRequestService, BidRequestRepository]
  
})
export class BidrequestModule {}

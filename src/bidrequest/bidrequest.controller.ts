import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, ValidationPipe, UsePipes, Query } from '@nestjs/common';
import { BidRequestService } from './bidrequest.service';
import { CreateBidrequestDto } from './dto/create-bidrequest.dto';
import { UpdateBidrequestDto } from './dto/update-bidrequest.dto';
import { BidRequest} from './schema/bidRequest.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/quards/jwt-auth.guard';
import { query } from 'express';



@Controller('bidrequest')
export class BidrequestController {
  constructor(private readonly bidrequestService: BidRequestService) {}




  
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createBidrequestDto: CreateBidrequestDto): Promise<BidRequest> {
    Logger.log(createBidrequestDto);
    return this.bidrequestService.create(createBidrequestDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: any): Promise<BidRequest[]> {


    let findstr:any = query;
    
    if(query.filter) {
      findstr = JSON.parse(query.filter);
    }
    


    
    Logger.debug('findstr= ' + JSON.stringify(findstr));
    return this.bidrequestService.findAll(findstr);
    
  }



  @Get(':id')
  async findOne(@Param('id') bidId: string): Promise<BidRequest> {
    return this.bidrequestService.findOne(bidId);
  }







  @Patch(':id')
  async update(
          @Param('id') id: string, 
          @Body() updateBidrequestDto: UpdateBidrequestDto) {
    
            return this.bidrequestService.update(id, updateBidrequestDto);

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidrequestService.remove(id);

  }
}

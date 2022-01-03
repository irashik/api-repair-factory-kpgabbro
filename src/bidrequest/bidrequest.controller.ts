import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, ValidationPipe, UsePipes, Query, UseGuards } from '@nestjs/common';
import { BidRequestService } from './bidrequest.service';
import { CreateBidrequestDto } from './dto/create-bidrequest.dto';
import { UpdateBidrequestDto } from './dto/update-bidrequest.dto';
import { BidRequest} from './schema/bidRequest.schema';
import { JwtAuthGuard } from 'src/auth/quards/jwt-auth.guard';



@Controller('bidrequest')
export class BidrequestController {
  constructor(private readonly bidrequestService: BidRequestService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createBidrequestDto: CreateBidrequestDto): Promise<BidRequest> {

    return await this.bidrequestService.create(createBidrequestDto);
    
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: any): Promise<BidRequest[]> {
    
    let findstr:any = query;
    if(!query.statusBid) {
        findstr.statusBid = {"$ne": "FINISHED"};
    }
    

    return await this.bidrequestService.findAll(findstr);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') bidId: string): Promise<BidRequest> {
    try {
      return this.bidrequestService.findOne(bidId);
    } catch (e) {
      return Promise.reject(e);
    }

  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update( @Param('id') id: string, 
                @Body() updateBidrequestDto: UpdateBidrequestDto) {
    
    return await this.bidrequestService.update(id, updateBidrequestDto);

  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.bidrequestService.remove(id);
    } catch(e) {
      return Promise.reject(e);
    }

  }

};

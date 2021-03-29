import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, ValidationPipe, UsePipes } from '@nestjs/common';
import { BidRequestService } from './bidrequest.service';
import { CreateBidrequestDto } from './dto/create-bidrequest.dto';
import { UpdateBidrequestDto } from './dto/update-bidrequest.dto';
import { BidRequest} from '../schemas/bidRequest.schema';



@Controller('bidrequest')
export class BidrequestController {
  constructor(private readonly bidrequestService: BidRequestService) {}




  
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createBidrequestDto: CreateBidrequestDto): Promise<BidRequest> {
    Logger.log(createBidrequestDto);
    return this.bidrequestService.create(createBidrequestDto);
  }

  @Get()
  findAll(): Promise<BidRequest[]> {
    return this.bidrequestService.findAll();
  }



  @Get(':id')
  async findOne(@Param('id') bidId: string): Promise<BidRequest> {
    return this.bidrequestService.findOne(bidId);
  }







  @Patch(':id')
  update(
          @Param('id') id: string, 
          @Body() updateBidrequestDto: UpdateBidrequestDto) {
    
            return this.bidrequestService.update(id, updateBidrequestDto);

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidrequestService.remove(id);

  }
}

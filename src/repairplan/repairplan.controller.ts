import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateRepairPlanDto } from './dto/create-repairPlan.dto';
import { UpdateRepairPlanDto } from './dto/update-repairPlan.dto';
import { RepairPlanService } from './repairplan.service';



@Controller('repairplan')
export class RepairPlanController {
    constructor(private readonly repairPlanService: RepairPlanService) {}




  @Post()
  //@UsePipes(new ValidationPipe())
  create(@Body() createPlanDto: CreateRepairPlanDto) {
      return this.repairPlanService.create(createPlanDto);
  }


  @Get()
  findAll(@Query() query: any, ) {
    /* get запрос с параметрами:
    * записи за период - один день или...
    * все записи получить
    * все записи по одному оборудованию
    * записи по группе оборудования
    * что еще?

    
    
    */
    Logger.debug('query==' + JSON.stringify(query));
    
    let dateCreated = query.dateСreated;
    let equipment = query.equipment;
    let minDate = query.minDate; //2021-07-26T16:33:31.676Z
    let maxDate = query.maxDate;
    let status = query.status;

    
    let find:any = {};

    if(dateCreated && minDate && maxDate) {
       find = {
        dateCreated: {
          $gte: minDate,
          $lt: maxDate
        }
      };
    }





    if(equipment) {
      find.equipment = equipment 
      
    }

    

    if(status) {
      find.status = status 
      
    }



    Logger.debug('findstr= ' + JSON.stringify(find));
    

      
    //почему не query или меняй его
    return this.repairPlanService.findAll(find);



  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    
    return this.repairPlanService.findOne(id);
  }

  @Patch(':id')
   update(@Param('id') id: string, @Body() updatePlanDto: UpdateRepairPlanDto) {
    return this.repairPlanService.update(id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repairPlanService.remove(id);
  }







}

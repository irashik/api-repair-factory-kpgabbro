import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateRepairPlanDto } from './dto/create-repairPlan.dto';
import { UpdateRepairPlanDto } from './dto/update-repairPlan.dto';
import { RepairPlanService } from './repairplan.service';
import { JwtAuthGuard } from '@App/auth/quards/jwt-auth.guard';



@Controller('repairplan')
export class RepairPlanController {
    constructor(private readonly repairPlanService: RepairPlanService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  //@UsePipes(new ValidationPipe())
  create(@Body() createPlanDto: CreateRepairPlanDto) {
      return this.repairPlanService.create(createPlanDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: any, ) {
    /* get запрос с параметрами:
    * записи за период - один день или...
    * все записи получить
    * все записи по одному оборудованию
    * записи по группе оборудования
    * что еще?
    */
    Logger.log('query==' + JSON.stringify(query));
    
    let dateCreated = query.dateСreated;
    let equipment = query.equipment;
    let minDate = query.minDate; //2021-07-26T16:33:31.676Z
    let maxDate = query.maxDate;
    let status = query.status;
    let tag = query.tag;
    let importance = query.importance;
    let description = query.description.toString();
    
    let find:any = {};

    if(status) {
      find.$and = [{"status": status}] 
    } else {
      find.$and = [
        {$or: [
          {"status": {"$nin": ["FINISHED", "CANCELLED"]}}
        ]}
      ]
    }

    if(dateCreated && minDate && maxDate) {
      find.$and.push({
        dateCreated: {
          $gte: minDate,
          $lt: maxDate
        }})
    }
    if(equipment) {
      find.$and.push({"equipment": equipment})
    }
    if(tag) {
      find.$and.push({"tag": tag})
    }
    if(query.importance) {
      find.$and.push({"importance": importance })
    }
    if(query.description) {
      find.$and.push({
        $text: {$search: description},
        scope: {$meta: "textScope"}
      });
    }

    Logger.log('findstr= ' + JSON.stringify(find));
    return this.repairPlanService.findAll(find);

  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    
    return this.repairPlanService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
   update(@Param('id') id: string, @Body() updatePlanDto: UpdateRepairPlanDto) {
    return this.repairPlanService.update(id, updatePlanDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repairPlanService.remove(id);
  }

}

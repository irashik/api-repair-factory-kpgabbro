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
  findAll(@Query() query: any) {
    let resultQuery:any = {};
    resultQuery = query;

    return this.repairPlanService.findAll(resultQuery);
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

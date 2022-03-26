import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Options, ValidationPipe, UsePipes, Logger, UseGuards } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateRepairDto } from './dto/create-equipment.dto';
import { UpdateRepairDto } from './dto/update-equipment.dto';
import { Repair } from './schema/equipment.schema';
import { JwtAuthGuard } from 'src/auth/quards/jwt-auth.guard';
import { sub } from 'date-fns';




@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  //@UsePipes(new ValidationPipe())
  create(@Body() createEquipmentDto: CreateRepairDto) {
    return this.equipmentService.create(createEquipmentDto);
  };

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: any, ): Promise<Repair[]> {
    let dateRepairStart = query.dateRepairStart;
    let equipment = query.equipment;
    let minDate = query.minDate; //2021-07-26T16:33:31.676Z
    let maxDate = query.maxDate;
    let find:any = {};

    if(dateRepairStart && minDate && maxDate) {
       find = {
        dateRepairStart: {
          $gte: minDate,
          $lt: maxDate
        }
      };
    }

    if(equipment) {
      find.equipment = equipment // {equipment: 'idObject('xxxx')' }
      // покажи записи не старше одного года

      
      let oldYear = sub(new Date(), {years: 1});
      let oldYearIso = oldYear.toISOString();

      find.dateRepairStart = {$gte: oldYearIso}

      if(query.viewAllPosition === "true") {
        delete find.dateRepairStart;

        Logger.debug('viewAllPosition === true');
      }

    }

    Logger.debug('query find = ', JSON.stringify(find));
    return this.equipmentService.findAll(find);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
      return this.equipmentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateRepairDto) {
    return this.equipmentService.update(id, updateEquipmentDto);
  };

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(id);
  };
}


import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Options, ValidationPipe, UsePipes, Logger } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { FilterQuery } from 'mongoose';
import { Equipment } from './schema/equipment.schema';
import {format, getMonth, parse, parseISO, addDays, formatISO} from 'date-fns';




@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) { }



  @Post()
  //@UsePipes(new ValidationPipe())
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
      return this.equipmentService.create(createEquipmentDto);
  }


  @Get()
  findAll(@Query() query: any, ) {
    /* get запрос с параметрами:
    * записи за период - один день или...
    * все записи получить
    * все записи по одному оборудованию
    * что еще?

    
    
    */
    Logger.debug('query==' + JSON.stringify(query));
    
    let dateRepairStart = query.dateRepairStart;
    let equipment = query.equipment;
    let minDate = query.minDate; //2021-07-26T16:33:31.676Z
    let maxDate = query.maxDate;

    
    let find = {};

    if(dateRepairStart && minDate && maxDate) {
       find = {
        dateRepairStart: {
          $gte: minDate,
          $lt: maxDate
        }
      };
    }

    if(equipment) {
      find = {
        equipment: equipment
      }
    }

    Logger.debug('findstr= ' + JSON.stringify(find));
    

      
    
    return this.equipmentService.findAll(find);



  }



  @Get(':id')
  findOne(@Param('id') id: string) {
      return this.equipmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentService.update(id, updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(id);
  }

 
}


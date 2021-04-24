import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Options, ValidationPipe, UsePipes, Logger } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { classToPlain, plainToClass } from 'class-transformer';



@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) { }



  @Post()
  //@UsePipes(new ValidationPipe())
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
      return this.equipmentService.create(createEquipmentDto);
  }


  @Get()
  findAll(@Query() query: any) {
    // get запрос с параметром unit - и передача в провайдер для
    // получения всех записей по одному оборудованию
    return this.equipmentService.findAll(query);

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


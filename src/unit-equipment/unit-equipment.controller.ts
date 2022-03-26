import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Logger } from '@nestjs/common';
import { UnitEquipmentService } from './unit-equipment.service';
import { UpdateUnitEquipmentDto } from './dto/update-unit-equipment.dto';
import { UnitEquipment } from 'src/unit-equipment/schema/unitEquipment.schema';
import { CreateUnitEquipmentDto } from './dto/create-unit-equipment.dto';


//Поиск всех единиц оборудования и поиск одной по id
// начальные данные заливаются предварительно.


@Controller('unit-equipment')
export class UnitEquipmentController {
  constructor(private readonly unitEquipmentService: UnitEquipmentService) {}


  @Get()
  async findAll(@Query() query: any): Promise<UnitEquipment[]> {
    let pipeline: any = [];
    let find: any = {};

    if(query.search) {
      find = {
        $and: [
          {rmMark: null},
          {$text: {$search: query.search}}
        ]
      
      }
    }
    
    pipeline = [{$match: {rmMark: null}}];
    
    Logger.debug('find= ' + JSON.stringify(find));
    //let cursor = await this.unitEquipmentService.aggregate(pipeline);
    //Logger.debug('cursor pipeline' + JSON.stringify(cursor));

    return this.unitEquipmentService.findAll(find);
  };

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UnitEquipment> {
    return this.unitEquipmentService.findOne(id);
  }

  @Patch(':id')
  update(
          @Param('id') id: string, 
          @Body() updateUnitEquipmentDto: UpdateUnitEquipmentDto) {
            return this.unitEquipmentService.update(id, updateUnitEquipmentDto);
  }

  @Post()
  create(@Body() CreateUnitEquipmentDto: CreateUnitEquipmentDto) {
    return this.unitEquipmentService.create(CreateUnitEquipmentDto);
  }

}

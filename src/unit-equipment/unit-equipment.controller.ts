import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnitEquipmentService } from './unit-equipment.service';
import { UpdateUnitEquipmentDto } from './dto/update-unit-equipment.dto';
import { UnitEquipment } from 'src/schemas/unitEquipment.schema';


//Поиск всех единиц оборудования и поиск одной по id
// начальные данные заливаются предварительно.


@Controller('unit-equipment')
export class UnitEquipmentController {
  constructor(private readonly unitEquipmentService: UnitEquipmentService) {}


  @Get()
  findAll(): Promise<UnitEquipment[]> {
    return this.unitEquipmentService.findAll();
  }

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

  
}

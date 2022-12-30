import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Logger, UseGuards } from '@nestjs/common';
import { UnitEquipmentService } from './unit-equipment.service';
import { UpdateUnitEquipmentDto } from './dto/update-unit-equipment.dto';
import { UnitEquipment } from '@App/unit-equipment/schema/unitEquipment.schema';
import { CreateUnitEquipmentDto } from './dto/create-unit-equipment.dto';
import { JwtAuthGuard } from '@App/auth/quards/jwt-auth.guard';



//Поиск всех единиц оборудования и поиск одной по id
// начальные данные заливаются предварительно.


@Controller('unit-equipment')
export class UnitEquipmentController {
  constructor(private readonly unitEquipmentService: UnitEquipmentService) {}


  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: any): Promise<UnitEquipment[]> {
    
    let find: any = {};
    let str = `\"${query.search}\"`;

    if(query.search) {
      find = {
        
          $text: {$search: str},
          scope: {$meta: "textScope"}
        

      
      }
    }
        Logger.debug(find);

    return this.unitEquipmentService.findAll(find);
  };

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UnitEquipment> {
    return this.unitEquipmentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
          @Param('id') id: string, 
          @Body() updateUnitEquipmentDto: UpdateUnitEquipmentDto) {
            return this.unitEquipmentService.update(id, updateUnitEquipmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() CreateUnitEquipmentDto: CreateUnitEquipmentDto) {
    return this.unitEquipmentService.create(CreateUnitEquipmentDto);
  }

}

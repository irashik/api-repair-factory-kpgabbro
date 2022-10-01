import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Options, ValidationPipe, UsePipes, Logger, UseGuards } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateRepairDto } from './dto/create-equipment.dto';
import { UpdateRepairDto } from './dto/update-equipment.dto';
import { Repair } from './schema/equipment.schema';
import { JwtAuthGuard } from '@App/auth/quards/jwt-auth.guard';




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


    return this.equipmentService.findAll(query);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
      return this.equipmentService.findOne(id);
  };

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


import { Injectable } from '@nestjs/common';
import { UnitEquipment } from 'src/schemas/unitEquipment.schema';
import { CreateUnitEquipmentDto } from './dto/create-unit-equipment.dto';
import { UpdateUnitEquipmentDto } from './dto/update-unit-equipment.dto';
import { UnitEquipmentRepository } from './unit-equipment.repository';

@Injectable()
export class UnitEquipmentService {
  constructor(
    private readonly unitEquipmentRepository: UnitEquipmentRepository ) {}
  

  async findAll(): Promise<UnitEquipment[]> {
    return this.unitEquipmentRepository.findAll({});

  }


  async findOne(id: string): Promise<UnitEquipment> {
    return this.unitEquipmentRepository.findOne({ _id: id });
    
  }

  async update(id: string, updateUnitEquipmentDto: UpdateUnitEquipmentDto) {
    return this.unitEquipmentRepository.findAndModify({ "_id": id }, updateUnitEquipmentDto);

  }
  
}

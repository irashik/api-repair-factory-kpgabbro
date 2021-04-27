

import { Injectable, Logger } from '@nestjs/common';
import { Equipment } from 'src/equipment/schema/equipment.schema';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { EquipmentRepository } from './equipment.repository';



@Injectable()
export class EquipmentService {
    constructor(private readonly equipmentRepository: EquipmentRepository) { }


  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    return this.equipmentRepository.create(createEquipmentDto);
  }

  async findAll(query: any): Promise<Equipment[]> {
      return this.equipmentRepository.findAll(query);
  }


  async findOne(_id: string): Promise<Equipment> {
    return this.equipmentRepository.findOne({_id });
  }


  async update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment> {
    
    return this.equipmentRepository.findAndModify({ "_id": id}, updateEquipmentDto);
  }


  async remove(id: string): Promise<Equipment> {

    return this.equipmentRepository.remove({"_id": id});
  }



}


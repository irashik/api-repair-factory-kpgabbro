import { Injectable, Logger } from '@nestjs/common';
import { Equipment } from 'src/equipment/schema/equipment.schema';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { EquipmentRepository } from './equipment.repository';



@Injectable()
export class EquipmentService {
    constructor(private readonly equipmentRepository: EquipmentRepository) { }


  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    return await this.equipmentRepository.create(createEquipmentDto);
  };

  async findAll(find: any): Promise<Equipment[]> {
    return await this.equipmentRepository.findAll(find);
  };


  async findOne(_id: string): Promise<Equipment> {
    return await this.equipmentRepository.findOne({_id });
  };


  async update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment> {
    return await this.equipmentRepository.findAndModify({ "_id": id}, updateEquipmentDto);
  };


  async remove(id: string): Promise<Equipment> {
    return await this.equipmentRepository.remove({"_id": id});
  };

}


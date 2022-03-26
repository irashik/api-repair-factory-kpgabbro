import { Injectable, Logger } from '@nestjs/common';
import { Repair } from '@App/repairs/schema/equipment.schema';
import { CreateRepairDto } from './dto/create-equipment.dto';
import { UpdateRepairDto } from './dto/update-equipment.dto';
import { EquipmentRepository } from './equipment.repository';



@Injectable()
export class EquipmentService {
    constructor(private readonly equipmentRepository: EquipmentRepository) { }


  async create(createRepairDto: CreateRepairDto): Promise<Repair> {
    return await this.equipmentRepository.create(createRepairDto);
  };

  async findAll(find: any): Promise<Repair[]> {
    return await this.equipmentRepository.findAll(find);
  };


  async findOne(_id: string): Promise<Repair> {
    return await this.equipmentRepository.findOne({_id });
  };


  async update(id: string, updateEquipmentDto: UpdateRepairDto): Promise<Repair> {
    return await this.equipmentRepository.findAndModify({ "_id": id}, updateEquipmentDto);
  };


  async remove(id: string): Promise<Repair> {
    return await this.equipmentRepository.remove({"_id": id});
  };

}


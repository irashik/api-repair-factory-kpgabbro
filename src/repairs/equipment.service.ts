import { Injectable, Logger } from '@nestjs/common';
import { Repair } from '@App/repairs/schema/equipment.schema';
import { CreateRepairDto } from './dto/create-equipment.dto';
import { UpdateRepairDto } from './dto/update-equipment.dto';
import { EquipmentRepository } from './equipment.repository';
import { sub } from 'date-fns';
import { PipelineStage } from 'mongoose';
import { PipelineCallback, PipelineOptions } from 'stream';
import { ObjectId } from 'mongodb';


@Injectable()
export class EquipmentService {
    constructor(private readonly equipmentRepository: EquipmentRepository) { }

  async create(createRepairDto: CreateRepairDto): Promise<Repair> {
    return await this.equipmentRepository.create(createRepairDto);
  };

  async findAll(queryService: any): Promise<Repair[]> {

    let dateRepairStart = queryService.dateRepairStart;
    let equipment = queryService.equipment;
    let minDate = queryService.minDate; //2021-07-26T16:33:31.676Z
    let maxDate = queryService.maxDate;
    let searchText = queryService.searchText;
    let viewAllPosition = queryService.viewAllPosition;

    let resultQueryService:any = {};

    if(dateRepairStart && minDate && maxDate) {
       resultQueryService = {
        dateRepairStart: {
          $gte: minDate,
          $lt: maxDate
        }
      };
    }

    if(equipment) {
      resultQueryService.$and = [{"equipment": equipment}]

    

      if(viewAllPosition !== "true") {

          // покажи записи не старше одного года
          let oldYear = sub(new Date(), {years: 1});
          let oldYearIso = oldYear.toISOString();

          resultQueryService.$and.push({
            dateRepairStart: {
              $gte: oldYearIso
            }
          });
        }

        if(searchText) {

          let regex = new RegExp(searchText, "i");
        
          resultQueryService.$and.push({
            repair: {$elemMatch: {description: regex}}
          })
     

    }
  }


    Logger.debug('resultQueryService = ' + JSON.stringify(resultQueryService));
    return await this.equipmentRepository.findAll(resultQueryService);
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


import { CreateRepairDto } from "@App/repairs/dto/create-equipment.dto";
import { dbQuery } from "./mockEquipmentRepository";


export const mockEquipmentService = {

    create: jest.fn((createRepairDto: CreateRepairDto) => {
      
    }),

    findAll: jest.fn((query) => {

        return Promise.resolve(dbQuery);

    }),




    remove: jest.fn((id) => {
        
    }),

    update: jest.fn((id, updateRecordDto) => {
        

    }),

    findOne: jest.fn((id) => {
        
    })


}






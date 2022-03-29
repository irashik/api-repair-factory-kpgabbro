import { CreateUnitEquipmentDto } from "@App/unit-equipment/dto/create-unit-equipment.dto"

export const mockUnitEquipmentRepository = {
    
    findAll: jest.fn(() => {

    }),



}


export const unitEquipmentRecord: CreateUnitEquipmentDto = {

    name: 'test Unit Equipment',
    position: "00",
    description: "description test",
    group: "group",
    alias: 'alias'

}

import { mockUintEquipmentService } from 'src/__mocks__/mockUnitEquipmentService';
import { Test, TestingModule } from '@nestjs/testing';
import { UnitEquipmentController } from './unit-equipment.controller';
import { UnitEquipmentService } from './unit-equipment.service';

describe('UnitEquipmentController', () => {
  let controller: UnitEquipmentController;

 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitEquipmentController],
      providers: [UnitEquipmentService],
    })
    .overrideProvider(UnitEquipmentService).useValue(mockUintEquipmentService)
    .compile();

    controller = module.get<UnitEquipmentController>(UnitEquipmentController);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  
});

import { mockUnitEquipmentRepository } from 'src/__mocks__/mockUnitEquipmentRepository';
import { Test, TestingModule } from '@nestjs/testing';
import { UnitEquipmentRepository } from './unit-equipment.repository';
import { UnitEquipmentService } from './unit-equipment.service';

describe('UnitEquipmentService', () => {
  let service: UnitEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     
      providers: [UnitEquipmentService, UnitEquipmentRepository ],



    })
    .overrideProvider(UnitEquipmentRepository).useValue(mockUnitEquipmentRepository)
    .compile();

    service = module.get<UnitEquipmentService>(UnitEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});

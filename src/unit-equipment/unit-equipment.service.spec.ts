import { Test, TestingModule } from '@nestjs/testing';
import { UnitEquipmentService } from './unit-equipment.service';

describe('UnitEquipmentService', () => {
  let service: UnitEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitEquipmentService],
    }).compile();

    service = module.get<UnitEquipmentService>(UnitEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

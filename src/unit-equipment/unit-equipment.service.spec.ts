import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UnitEquipment, UnitEquipmentSchema } from './schema/unitEquipment.schema';
import { UnitEquipmentController } from './unit-equipment.controller';
import { UnitEquipmentRepository } from './unit-equipment.repository';
import { UnitEquipmentService } from './unit-equipment.service';

describe('UnitEquipmentService', () => {
  let service: UnitEquipmentService;
  const mockUnitEquipmentRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     
      providers: [UnitEquipmentService, 
        {
          provide: UnitEquipmentRepository,
          useValue: mockUnitEquipmentRepository,
        }
      
      ],



      controllers: [UnitEquipmentController]
    }).compile();

    service = module.get<UnitEquipmentService>(UnitEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

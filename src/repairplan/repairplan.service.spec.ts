import { mockRepairPlanRepository } from 'src/__mocks__/mockRepairPlanRepository';
import { Test, TestingModule } from '@nestjs/testing';
import { RepairPlanRepository } from './repairplan.repository';
import { RepairPlanService } from './repairplan.service';

describe('RepairplanService', () => {
  let service: RepairPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepairPlanService, RepairPlanRepository],
    })
    .overrideProvider(RepairPlanRepository).useValue(mockRepairPlanRepository)
    .compile();

    service = module.get<RepairPlanService>(RepairPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

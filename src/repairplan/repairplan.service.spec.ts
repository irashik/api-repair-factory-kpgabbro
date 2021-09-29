import { Test, TestingModule } from '@nestjs/testing';
import { RepairPlanService } from './repairplan.service';

describe('RepairplanService', () => {
  let service: RepairPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepairPlanService],
    }).compile();

    service = module.get<RepairPlanService>(RepairPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RepairplanService } from './repairplan.service';

describe('RepairplanService', () => {
  let service: RepairplanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepairplanService],
    }).compile();

    service = module.get<RepairplanService>(RepairplanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

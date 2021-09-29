import { Test, TestingModule } from '@nestjs/testing';
import { RepairPlanController } from './repairplan.controller';

describe('RepairplanController', () => {
  let controller: RepairPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepairPlanController],
    }).compile();

    controller = module.get<RepairPlanController>(RepairPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

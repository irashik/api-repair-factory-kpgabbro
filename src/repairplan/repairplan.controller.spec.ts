import { mockRepairPlanSerivce } from 'src/__mocks__/mockRepairPlanSerivce';
import { Test, TestingModule } from '@nestjs/testing';
import { RepairPlanController } from 'src/repairplan/repairplan.controller';
import { RepairPlanService } from 'src/repairplan/repairplan.service';

describe('RepairplanController', () => {
  let controller: RepairPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepairPlanController],
      providers: [RepairPlanService]

      
    })
    .overrideProvider(RepairPlanService).useValue(mockRepairPlanSerivce)
    .compile();

    controller = module.get<RepairPlanController>(RepairPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

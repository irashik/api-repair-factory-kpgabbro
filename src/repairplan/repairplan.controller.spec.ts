import { Test, TestingModule } from '@nestjs/testing';
import { RepairplanController } from './repairplan.controller';

describe('RepairplanController', () => {
  let controller: RepairplanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepairplanController],
    }).compile();

    controller = module.get<RepairplanController>(RepairplanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

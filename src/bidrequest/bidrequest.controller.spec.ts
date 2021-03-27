import { Test, TestingModule } from '@nestjs/testing';
import { BidrequestController } from './bidrequest.controller';
import { BidrequestService } from './bidrequest.service';

describe('BidrequestController', () => {
  let controller: BidrequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BidrequestController],
      providers: [BidrequestService],
    }).compile();

    controller = module.get<BidrequestController>(BidrequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BidRequestService } from './bidrequest.service';

describe('BidrequestService', () => {
  let service: BidRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BidRequestService],
    }).compile();

    service = module.get<BidRequestService>(BidRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

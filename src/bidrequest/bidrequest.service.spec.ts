import { mockBidRequestRepository } from '@App/__mocks__/mockBidRequestRepository';
import { recordedBidRequest } from '@App/__mocks__/mockBidRequestService';
import { Test, TestingModule } from '@nestjs/testing';
import { BidRequestRepository } from './bidrequest.repository';
import { BidRequestService } from './bidrequest.service';

describe('BidrequestService', () => {
  let service: BidRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BidRequestService, BidRequestRepository],
    })
    .overrideProvider(BidRequestRepository).useValue(mockBidRequestRepository)
    .compile();

    service = module.get<BidRequestService>(BidRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create', () => {
    const record = { ...recordedBidRequest};
    delete record._id;

    expect(service.create(record)).resolves.toEqual(recordedBidRequest);
    expect(mockBidRequestRepository.create).toBeCalled();
  });

  it('should be findAll', () => {

  });

  it('should be findOne', () => {

  });

  it('should be update', () => {

  });

  it('should be remove', () => {

  });




});

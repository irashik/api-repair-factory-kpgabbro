import { JwtAuthGuard } from 'src/auth/quards/jwt-auth.guard';
import { mockBidRequestService } from 'src/__mocks__/mockBidRequestService';
import { Test, TestingModule } from '@nestjs/testing';
import { BidrequestController } from './bidrequest.controller';
import { BidRequestService } from './bidrequest.service';
import { queryResult, recordedBidRequest, updateRecordBidRequestDto } from 'src/__mocks__/mockBidRequestRepository';

describe('BidrequestController', () => {
  let controller: BidrequestController;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BidrequestController],
      providers: [BidRequestService, 
        JwtAuthGuard
      ],
    })
    .overrideProvider(BidRequestService).useValue(mockBidRequestService)
    .compile();

    controller = module.get<BidrequestController>(BidrequestController);
  });

  afterEach(() => {
    mockBidRequestService.create.mockClear();

  })



  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create', () => {
    

    expect(controller.create(recordedBidRequest)).resolves.toStrictEqual(updateRecordBidRequestDto);
    
    expect(mockBidRequestService.create).toBeCalled();

  });

  
  it('should be findAll', () => {
    const query = {

    };
    expect(controller.findAll(query)).resolves.toEqual(queryResult);
    expect(mockBidRequestService.findAll).toBeCalledTimes(1);
  });

  it('should be findOne', () => {
    const id = 'userId';
    expect(controller.findOne(id)).resolves.toEqual(updateRecordBidRequestDto)
    expect(controller.findOne('')).rejects.toBeTruthy();

    expect(mockBidRequestService.findOne).toBeCalledTimes(2);

  })

  it('should be update', () => {
    const id = 'userId';
    expect(controller.update(id, updateRecordBidRequestDto)).resolves.toEqual(updateRecordBidRequestDto);
    expect(controller.update('', updateRecordBidRequestDto)).rejects.toBeTruthy();

    expect(mockBidRequestService.update).toBeCalledTimes(2);

  })

  it('should be remove', () => {
    const id = 'userId';
    expect(controller.remove(id)).resolves.toEqual(updateRecordBidRequestDto);
    expect(controller.remove('')).rejects.toBeTruthy();
    expect(mockBidRequestService.remove).toBeCalledTimes(2);
  })

});

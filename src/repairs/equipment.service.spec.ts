import { dbQuery, mockEquipmentRepository, recordEquipment } from 'src/__mocks__/mockEquipmentRepository';
import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentRepository } from './equipment.repository';
import { EquipmentService } from './equipment.service';

describe('EquipmentService', () => {
  let service: EquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentService, EquipmentRepository],
    })
    .overrideProvider(EquipmentRepository).useValue(mockEquipmentRepository)
    .compile();

    service = module.get<EquipmentService>(EquipmentService);
  });

  afterEach(() => {
    mockEquipmentRepository.create.mockClear();
    mockEquipmentRepository.findOne.mockClear();
    mockEquipmentRepository.findAll.mockClear();
    mockEquipmentRepository.findAndModify.mockClear();
    mockEquipmentRepository.remove.mockClear();

  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should be create', () => {



    expect(service.create(recordEquipment)).resolves.toStrictEqual(recordEquipment);

    expect(mockEquipmentRepository.create).toBeCalled();
    
  });


  it('should be findAll method', () => {
    let find = {};

    expect(service.findAll(find)).resolves.toStrictEqual(dbQuery)
    expect(mockEquipmentRepository.findAll).toBeCalled();



  });


});
function createRepairDto(createRepairDto: any): Promise<import("./schema/equipment.schema").Repair> {
  throw new Error('Function not implemented.');
}


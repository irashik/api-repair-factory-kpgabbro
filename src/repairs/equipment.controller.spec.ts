import { dbQuery } from '@App/__mocks__/mockEquipmentRepository';
import { mockEquipmentService } from '@App/__mocks__/mockEquipmentService';
import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';

describe('EquipmentController', () => {
  let controller: EquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentController],
      providers: [EquipmentService],
    })
    .overrideProvider(EquipmentService).useValue(mockEquipmentService)
    .compile();

    controller = module.get<EquipmentController>(EquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it.skip('shoul be create', () => {

  });

  it('shoult be findAll', () => {
    let query = {};

    expect(controller.findAll(query)).resolves.toStrictEqual(dbQuery);
    expect(mockEquipmentService.findAll).toBeCalled();




  });

  it.skip('should be findOne', () => {

  });

  it.skip('shoult be update', () => {

  });

  it.skip('should be remove', () => {

  })


  
});

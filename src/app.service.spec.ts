import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { mockConfigService } from './__mocks__/mockConfigService';

describe('AppService', () => {
  let service: AppService;
 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      providers: [AppService, 
      {
        provide: ConfigService,
        useValue: mockConfigService
      }
      ],

    })
    .compile();

    service = module.get<AppService>(AppService);

  });

  it('should be defined', () => {

    expect(service).toBeDefined();

  });

  it('should return value getHello()', () => {

    expect(service.getHello()).toMatch(/Hello/);


  })

  
 

});

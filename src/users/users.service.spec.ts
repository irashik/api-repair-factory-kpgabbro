import { mockConfigService } from 'src/__mocks__/mockConfigService';
import { mockMailSendService } from 'src/__mocks__/mockMailSendService';
import { mockUserRepository, recordCreateUser, recordUser } from '@App/__mocks__/mockUserRepository';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersController } from './users.controller';
import { ObjectId } from 'mongodb';




describe('UsersService', () => {
  let service: UsersService;
  
  jest.mock('bcrypt');
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UserRepository, ConfigService, MailerService ],
      controllers: [UsersController]

    })
    .overrideProvider(ConfigService).useValue(mockConfigService)
    .overrideProvider(UserRepository).useValue(mockUserRepository)
    .overrideProvider(MailerService).useValue(mockMailSendService)
    .compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    mockConfigService.get.mockClear();
    mockUserRepository.create.mockClear();
    mockMailSendService.sendMail.mockClear();

  });



  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('testing method create method',   () => {
     
    let bcryptHash: jest.Mock;
    bcryptHash = jest.fn().mockReturnValueOnce("$2b$10$afrAgLfatFihtknMwbbhJuEMQ9/e50qOmMPsXd98C2wPw4Cp.aTaS");
    (bcrypt.hash as jest.Mock) = bcryptHash;
      
    

    let result = [
      {"status": "fulfilled", "value": 'mailToSended'},
      {"status": "fulfilled", "value": 
        {"_id": new ObjectId('608aa69e3c966fc4f6c99e4a'), "admin": true, "confirmation": true, "created": new Date('2022-02-19T21:00:00.000Z'), "email": "user@test.ru", "name": "user", "password": "$2b$10$afrAgLfatFihtknMwbbhJuEMQ9/e50qOmMPsXd98C2wPw4Cp.aTaS", "position": "position", "verifed": true}
      }
    ];
    
    expect(service.create(recordCreateUser)).resolves.toStrictEqual(result);


    expect(bcryptHash).toHaveBeenCalled();

    //expect(mockConfigService.get).toHaveBeenCalled();
    //expect(mockUserRepository.create).toHaveBeenCalled();
    //expect(mockMailSendService.sendMail).toHaveBeenCalled();
    

  });

  it('testing findOne method', () => {

    let id = '608aa69e3c966fc4f6c99e4a';

    expect(service.findOne(id)).resolves.toStrictEqual(recordUser);
    expect(mockUserRepository.findOne).toBeCalled();
  });





});

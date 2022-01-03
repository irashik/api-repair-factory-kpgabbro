import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    create: jest.fn((user) => {
            
      const a = {
          "_id": "testId2984902",
        }
        return Promise.resolve(Object.assign(user, a));
        
      })
    };


  

  const mockConfigService = {
      get: jest.fn((key: string) => {
        if (key == "saltRounds") {
          return 2;
        }
        if(key == 'HTTP_HOST') {
          return 'testhost'
        }
        if(key == 'HTTP_PORT') {
          return 3500
        }
        return "testConfig";
      })
  };

  const mockMailSendService = {
    sendMail: jest.fn((key: any) => {
      return Promise.resolve("mailToSended")
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      providers: [UsersService, 
        {
          provide: UserRepository,
          useValue: mockUserRepository
        },
        {
        provide: MailerService,
        useValue: mockMailSendService

      }, 
      {
        provide: ConfigService,
        useValue: mockConfigService
      }
      ],

    })
    .compile();

    service = module.get<UsersService>(UsersService);

  });

  it.skip('should be defined', () => {

    expect(service).toBeDefined();

  });

  it('testing method create method',  async () => {

    let createUser = new CreateUserDto();

  Object.assign(createUser,  {
      "email": "lavon.lynch86@ethereal.email",
      "name": "test manual",
      "position": "test",
      "password": "ZGPWWbV9HZNEKKFqbN",
  });

 
  const res = service.create(createUser);

  res.then(a => {
    Logger.debug(a);
  });
   
  expect(res).resolves.toBeTruthy();

 

    

  })
});

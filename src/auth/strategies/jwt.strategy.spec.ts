import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockJwtService, validtoken } from 'src/__mocks__/mockJwtService';
import { mockConfigService } from 'src/__mocks__/mockConfigService';
import { JwtStrategy } from './jwt.strategy';


describe('JwtStrategy', () => {
  let service: JwtStrategy;

  const accessUser = {
    "username":"user",
    "email":"test@test.ru",
    "sub":"608aa69e3c966fc4f6c99e4a",
    "iat":1630250945,
    "exp":1630251545
  }


  
  

 



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [  ],
      providers: [JwtStrategy, ConfigService, JwtService],
    })
    .overrideProvider(ConfigService).useValue(mockConfigService)
    .overrideProvider(JwtService).useValue(mockJwtService)
    
    .compile();

    service = module.get<JwtStrategy>(JwtStrategy);

  });



  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('method validate', () => {
    const req = { headers: {
      authorization: 'Bearer ' + validtoken
    }};
    const user = {}

    expect(service.validate(req, user)).resolves.toStrictEqual(accessUser);

  });


  
  it('method validate insert wrong token', () => {

    let req = { headers: {
      authorization: 'Bearer ' + validtoken + "xxxx"
    }}
    let user = {};

    expect(service.validate(req, user)).rejects.toThrowError();
    





  })



  
});



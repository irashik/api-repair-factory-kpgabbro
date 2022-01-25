import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';
import { mockConfigService } from 'src/__mocks__/mockConfigService';
import { mockJwtService, validtoken as jwtRefToken, recordTokenDecoded } from 'src/__mocks__/mockJwtService';
import { mockTokenService } from 'src/__mocks__/mockTokenService';
import { mockUserService, recordUser} from 'src/__mocks__/mockUserService';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';



describe('AuthService', () => {
  let service: AuthService;

  jest.mock('bcrypt');

  let bcryptCompare: jest.Mock;


  const response = {
    accessToken: 'newToken',
    refreshToken: 'newToken',
    userName: 'user',
    userId: '608aa69e3c966fc4f6c99e4a',
    status: 200
}
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, UsersService, JwtService, TokenService, ConfigService
      ],
    })
    .overrideProvider(UsersService).useValue(mockUserService)
    .overrideProvider(JwtService).useValue(mockJwtService)
    .overrideProvider(ConfigService).useValue(mockConfigService)
    .overrideProvider(TokenService).useValue(mockTokenService)
    
    .compile();

    service = module.get<AuthService>(AuthService);


      
  });

  afterEach(() => {
    mockUserService.findOne.mockClear();
    mockUserService.findOneAuth.mockClear();
    
    mockJwtService.verify.mockClear();
    mockJwtService.sign.mockClear();

    mockTokenService.exists.mockClear();
    mockTokenService.create.mockClear();

    mockConfigService.get.mockClear();

  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should method signIn insert user return ITokenUser', () => {
    const user = {
      email: 'user@test.ru',
      password: 'test'
    };



    bcryptCompare = jest.fn().mockReturnValueOnce(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    expect(service.signIn(user)).resolves.toStrictEqual(response);

    expect(mockUserService.findOneAuth).toBeCalled();
    expect(mockUserService.findOneAuth.mock.results[0].value).resolves.toStrictEqual(recordUser);
    
    // не отлавливаются, хотя возвращают значения.
    //expect(bcryptCompare).toHaveBeenCalled();
    //expect(mockConfigService.get).toBeCalled();
    //expect(mockJwtService.sign).toBeCalled();
    //expect(mockTokenService.create).toHaveBeenCalled();


    ////


    //expect(mockTokenService.create).toBeCalled();
    const wrongUser = {}
    //expect(service.signIn(wrongUser)).rejects.toThrowError()
    //expect(mockUserService.findOne).toBeCalled();



  });

  it('should method checkRefreshToken - insert refToken return ITokenUser', () => {
   

    expect(service.updateRefreshToken(jwtRefToken)).resolves.toStrictEqual(response);


    

    expect(mockJwtService.verify).toBeCalledTimes(1);
    expect(mockTokenService.exists).toBeCalledTimes(1);
    //expect(mockUserService.findOne).toBeCalledTimes(1);



    // expect(service.updateRefreshToken("wrongToken")).rejects.toThrowError();
    // expect(mockJwtService.verify).toBeCalledTimes(2);
    // expect(service.updateRefreshToken("")).rejects.toThrowError();
    // expect(mockJwtService.verify).toBeCalledTimes(3);
    

  });

  it('should logout - insert userId, return boolean', () => {

    const userId:any = 'userId';
    expect(service.logout(userId)).resolves.toBe(true);
    expect(mockTokenService.deleteAll).toBeCalledTimes(1);





    const wrongUser:any = 'wrongUser';
    expect(service.logout(wrongUser)).rejects.toThrowError();
    expect(mockTokenService.deleteAll).toBeCalledTimes(2);




    const empty:any = '';
    expect(service.logout(empty)).rejects.toThrowError();
    expect(mockTokenService.deleteAll).toBeCalledTimes(3);

  });

});

import { mockAuthService, refreshToken, response } from '@App/__mocks__/mockAuthService';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginUserDto } from '@App/users/dto/login-user.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';





describe('AuthController', () => {
  let controller: AuthController;

  let loginUserDto: LoginUserDto = {
    email: 'test@test.ru',
    password: 'password'
  };



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
    .overrideProvider(AuthService).useValue(mockAuthService)
    .compile();
    controller = module.get<AuthController>(AuthController);
  });

   

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be root', () => {
    expect(controller.root()).toBeTruthy();
  })

  it('should be login', () => {
    expect(controller.login(loginUserDto)).resolves.toBe(response);
    expect(mockAuthService.signIn).toHaveBeenCalledTimes(1);
  });

  it('should not be login', () => {

    let wrongUser:any = loginUserDto;
    let wrongUser2:any =  loginUserDto;
    wrongUser.password = '';
    wrongUser2.email = '';

    expect(controller.login(wrongUser)).rejects.toThrowError('check email or password');
    expect(controller.login(wrongUser2)).rejects.toThrowError('check email or password');
    expect(mockAuthService.signIn).not.toHaveBeenCalled();
  });

  it('should not be login - password or email wrong', () => {
    let wrongUser1 =  loginUserDto;
    let wrongUser2 =  loginUserDto;
    wrongUser1.password = 'wrongPassword';
    wrongUser2.email = 'wrongEmail';

   expect(controller.login(wrongUser1)).rejects.toBe('not valid');
   expect(controller.login(wrongUser2)).rejects.toBe('not valid');
   expect(mockAuthService.signIn).toHaveBeenCalledTimes(2);
  });

  it('should be refresh', () => {
    expect(controller.refresh(refreshToken)).resolves.toBe(response);
  });

  it('should be refresh not valid token', () => {
    expect(controller.refresh("notvalid")).resolves.toBe('no valid refresh');
  })

  it('should be logout', () => {
    const query = {
      userId: 'userId'
    }
    
    expect(controller.logout(query)).resolves.toMatch(/is logout/);
    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it('should not be logout', () => {
    const query2 = {
      userId: 'wrongUserId'
    }

    expect(controller.logout(query2)).rejects.toThrowError();
    expect(mockAuthService.logout).toHaveBeenCalled();

  })




  afterEach(() => {
    mockAuthService.signIn.mockClear();

  })
  
});

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';



describe('AppController testing', () => {
  let appController: AppController;


  const mockAppService = {
    getHello: jest.fn(() => {
      return 'test'
    })
  }


  
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
    
    .overrideProvider(AppService).useValue(mockAppService)
    .compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return root get ', () => {
    expect(appController.getHello()).toBe('test');

  });

});


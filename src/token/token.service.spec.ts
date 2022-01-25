import { mockTokenRepository } from 'src/__mocks__/mockTokenRepository';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      providers: [TokenService, TokenRepository],
      exports: [TokenService]
    })
    .overrideProvider(TokenRepository).useValue(mockTokenRepository)
    .compile();

    service = module.get<TokenService>(TokenService);
  });



  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  
});


import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor( private configService: ConfigService) {}


  getHello(): string {
    
    const testVar = this.configService.get('HTTP_HOST');

    return 'Hello World Dima from NetsJs!' + testVar;
    
  }
  
}

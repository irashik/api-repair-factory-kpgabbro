import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService)
  { }


  getHello(): string {
    
    Logger.warn("Hello Dima");
    return 'Hello it is API Service Journal of Repeat kpGabbro';
  }
}

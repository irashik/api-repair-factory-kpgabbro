import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService)
  { }


  getHello(): string {
    return 'Hello it is main controller!';
  }
}

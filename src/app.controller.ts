import { Controller, Get, Post, Request, UseGuards, Logger } from '@nestjs/common';
import { AppService } from "@App/app.service";
import { exceptions } from 'winston';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}



  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

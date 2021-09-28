

import { Test, TestingModule } from '@nestjs/testing';
//import { request } from 'express';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as request from 'supertest';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello it is main path this app"', () => {
      expect(appController.getHello()).toBe('Hello it is main path this app');
    });
  });

  // it(`/GET root`, () => {
  //   return request(app.getHttpServer())
  //   .get('/')
  //   .expect(200)
    
  // })



});


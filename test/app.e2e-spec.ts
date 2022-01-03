import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, INestApplication, Res } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from '@App/app.service';
import { AppController } from '@App/app.controller';
import { BidrequestModule } from '@App/bidrequest/bidrequest.module';
import { EquipmentModule } from '@App/equipment/equipment.module';
import { UsersModule } from '@App/users/users.module';
import { AuthModule } from '@App/auth/auth.module';
import { LoggerModule } from '@App/logger/logger.module';
import { UnitEquipmentModule } from '@App/unit-equipment/unit-equipment.module';
import { RepairPlanModule } from '@App/repairplan/repairplan.module';
import dotenv_expand from 'dotenv-expand';
import { doesNotMatch } from 'assert';
import { endianness } from 'os';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
      HttpModule,  
      AppModule,
      BidrequestModule,
      EquipmentModule,
      UsersModule,
      AuthModule,
      LoggerModule,
      UnitEquipmentModule,
      RepairPlanModule

      ],
      providers: [AppService],
      controllers: [AppController]
    })
    
    
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  afterAll(() => {
    app.close();
  })

  it('/ (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('it is main controller!')
      .end(done)
  });

  it('/auth  (get)', (done) => {
    return request(app.getHttpServer())
      .get('/auth')
      .expect(200)
      .expect('it is auth controller!')
      .end(done)

  });

  it.only('/auth/login  POST', async (done) => {

    let loginUserDto = {
      email: 'dima@test.ru',
      password: 'dima'
    };

    const response = {
     //accessToken: 'newAccessToken',
     // refreshToken: 'newRefreshToken',
      userName: 'dima',
      userId: '60b3374fee1912c9909b9f59',
      status: 200
  }

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginUserDto)
      .expect(200)
            
      expect(JSON.parse(res.text)).toMatchObject(response);
      done();
  });

  


});

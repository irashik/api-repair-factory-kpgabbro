import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@App/app.module';
import { AppService } from '@App/app.service';
import { AppController } from '@App/app.controller';
import { BidrequestModule } from '@App/bidrequest/bidrequest.module';
import { EquipmentModule } from '@App/repairs/equipment.module';
import { UsersModule } from '@App/users/users.module';
import { AuthModule } from '@App/auth/auth.module';
import { LoggerModule } from '@App/logger/logger.module';
import { UnitEquipmentModule } from '@App/unit-equipment/unit-equipment.module';
import { RepairPlanModule } from '@App/repairplan/repairplan.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from '@App/config/config.database';
import { recordCreateUser } from '@App/__mocks__/mockUserRepository';


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
         MongooseModule.forRootAsync({
           useClass: DatabaseConfig
         }),
         
        AppModule,
        BidrequestModule,
        EquipmentModule,
        UsersModule,
        AuthModule,
        LoggerModule,
        UnitEquipmentModule,
        RepairPlanModule,
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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(/main controller/)
      .end()
  });

  it('/auth  (get)', () => {
    return request(app.getHttpServer())
      .get('/auth')
      .expect(200)
      .expect(/auth controller/)
      .end()

  });

  it('/auth/login  POST', async () => {

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
      //done();
  });

  it('/users/register', async () => {


    let result = [
      {"status": "fulfilled", "value": 'mailToSended'},
      {"status": "fulfilled", "value": 
        {"_id": "608aa69e3c966fc4f6c99e4a", "admin": true, "confirmation": true, "created": new Date('2022-02-19T21:00:00.000Z'), "email": "user@test.ru", "name": "user", "password": "$2b$10$afrAgLfatFihtknMwbbhJuEMQ9/e50qOmMPsXd98C2wPw4Cp.aTaS", "position": "position", "verifed": true}
      }
    ];

    let {...newUser } = recordCreateUser;

    let random = Math.round(Math.random() * 100000);
    newUser.email = random.toString() + '@test.test'


    const res = await request(app.getHttpServer()).post('/users/register')

    .send(newUser)
    .expect(201)
    //done();

  });



  


});

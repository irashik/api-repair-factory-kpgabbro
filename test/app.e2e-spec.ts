import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, INestApplication, Res } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';
import { BidrequestModule } from 'src/bidrequest/bidrequest.module';
import { EquipmentModule } from 'src/equipment/equipment.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { LoggerModule } from 'src/logger/logger.module';
import { UnitEquipmentModule } from 'src/unit-equipment/unit-equipment.module';
import { RepairPlanModule } from 'src/repairplan/repairplan.module';
import { TokenModule } from 'src/token/token.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from 'src/config/config.database';
import { recordCreateUser } from '@App/__mocks__/mockUserRepository';


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
         MongooseModule.forRootAsync({
           useClass: DatabaseConfig
         }),

        HttpModule,  
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

  it('/ (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(/main controller/)
      .end(done)
  });

  it('/auth  (get)', (done) => {
    return request(app.getHttpServer())
      .get('/auth')
      .expect(200)
      .expect(/auth controller/)
      .end(done)

  });

  it('/auth/login  POST', async (done) => {

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

  it.only('/users/register', async (done) => {


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
    
    done();

  });



  


});

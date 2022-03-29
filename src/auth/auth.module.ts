import { Module } from '@nestjs/common';
import { UsersModule } from "@App/users/users.module";

import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from '@App/token/token.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';


@Module({
  imports: [
    UsersModule, 
    TokenModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>({
        secret: configService.get('jwt_secret'),
        signOptions: { expiresIn: configService.get('accessToken_expiresIn') },
      })
    }),
  ],
  
  controllers: [ AuthController ],
  providers: [AuthService, JwtStrategy ],
  exports: [ AuthService ]

})

export class AuthModule {


}


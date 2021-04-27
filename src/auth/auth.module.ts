import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'src/config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from 'src/token/token.module';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    UsersModule, 
    TokenModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),

  ],
  
  
  
  providers: [AuthService, JwtStrategy],
  exports: [ AuthService ]

})

export class AuthModule {


}


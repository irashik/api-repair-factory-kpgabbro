import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from './schema/refresh.token.schema';
import { TokenRepository } from 'src/token/token.repository';
import { TokenService } from 'src/token/token.service';

@Module({
  imports: [ 
    MongooseModule.forFeature(
      [
        { name: RefreshToken.name, 
          schema: RefreshTokenSchema
        }
      ]),
  ],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})

export class TokenModule {}


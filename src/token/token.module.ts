import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from './schema/refresh.token.schema';

import { TokenRepository } from "@App/token/token.repository";
import { TokenService } from "@App/token/token.service";

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


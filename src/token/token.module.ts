import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenSchema } from './schema/refresh.token.schema';
import { TokenService } from './token.service';

@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: 'Token', schema: RefreshTokenSchema}]),
  ],
  providers: [TokenService],
  exports: [TokenService],
})

export class TokenModule {}


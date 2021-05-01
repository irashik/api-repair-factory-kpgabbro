import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessTokenSchema } from './schema/access.token.schema';
import { TokenService } from './token.service';

@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: 'Token', schema: AccessTokenSchema}]),
  ],
  providers: [TokenService],
  exports: [TokenService],
})

export class TokenModule {}


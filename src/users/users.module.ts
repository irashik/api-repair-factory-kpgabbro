import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name, 
      schema: UserSchema 
    }]),
    ConfigModule,
    
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService]
})


export class UsersModule {}

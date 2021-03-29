import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';




@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name, 
      schema: UserSchema 
    }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository]
})


export class UsersModule {}

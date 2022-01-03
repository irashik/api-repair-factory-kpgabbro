import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from '../users/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './users.repository';
import { ConfigModule} from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfig } from 'src/config/mailerConfig';



@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name, 
      schema: UserSchema 
    }]),
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MailerConfig,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService]
})


export class UsersModule {}

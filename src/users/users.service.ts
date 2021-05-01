import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './schema/user.schema';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private configService: ConfigService,
    
  ) { }
  

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await this.hashPassword(createUserDto.password);
    createUserDto.password = hash;
    createUserDto.created = new Date();
    
    // todo Еще нужно отправить емейлы подтверждения и админу для верификации 

    return this.userRepository.create(createUserDto);
  }

  async findOne(_id: string): Promise<User>  {
    return this.userRepository.findOne({ "_id": _id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.findAndModify({ "_id": id}, updateUserDto);
  }
  
  
  //  @UsePipes(new ValidationPipe())
  // проверить что передается email ???
  async findOneAuth(email: string): Promise<User> {
    return this.userRepository.findOne({"email": email });
  }



  private async hashPassword(password: string): Promise<string> {
    const salt = this.configService.get('saltRounds');
    return bcrypt.hash(password, salt);
  }

}



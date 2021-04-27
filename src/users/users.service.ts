import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

import { User } from './schema/user.schema';
import { IUser } from './interface/user.interface';

import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';


@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UserRepository
    
    ) { }
  

  async create(createUserDto: CreateUserDto): Promise<User> {

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(createUserDto.password, salt);

    createUserDto.password = hash;
    createUserDto.salt = salt;

    return this.userRepository.create(createUserDto);
  }

  

  async findOne(_id: string): Promise<User>  {
    return this.userRepository.findOne({ _id });
  }


  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.findAndModify({ "_id": id}, updateUserDto);
  }
  
  

  async findOneAuth(email: string): Promise<User> {
    return this.userRepository.findOne({"email": email });
    
  }



}

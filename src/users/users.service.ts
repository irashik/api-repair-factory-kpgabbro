import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UserRepository) {}

  

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }



  async findAll(): Promise<User[]> {
    return this.userRepository.findAll({});

  }

  findOne(_id: string): Promise<User>  {
    return this.userRepository.findOne({ _id });
  }


  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.findAndModify({ "_id": id}, updateUserDto);
  }


  
  async remove(id: string): Promise<User> {
    return this.userRepository.remove({ "_id": id });
  }



}

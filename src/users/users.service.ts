import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { User } from './schema/user.schema';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { ICreateUser } from './interfaces/user.interface';


@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly mailSendService: MailerService

  ) { }
  

  async create(createUserDto: ICreateUser): Promise<any> {
    try {

      const hash = await this.hashPassword(createUserDto.password);
      createUserDto.password = hash;
      createUserDto.created = new Date();
    
      const responseDb:User =  await this.userRepository.create(createUserDto);
      const readyMessageUser = await this.prepareMailPageForUser(responseDb);
      const resInfoSendMailToUser = this.mailSendService.sendMail(readyMessageUser);

      return await Promise.allSettled([resInfoSendMailToUser, Promise.resolve(responseDb)]);

    }
    catch(e) {
      throw new Error('error create new User. error = ' + e);
    }
  };

  async findOne(_id: string): Promise<User>  {
    return await this.userRepository.findOne({ "_id": _id });
  };

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.findAndModify({ "_id": id}, updateUserDto);
  };

  //  @UsePipes(new ValidationPipe())
  // todo проверить что передается email ???
  async findOneAuth(email: string): Promise<User> {
    return await this.userRepository.findOne({"email": email });
  };



  
  private async hashPassword(password: string): Promise<string> {
    const salt = this.configService.get('saltRounds');
    return bcrypt.hash(password, salt);
  };

  private prepareMailPageForUser(user:User) {
    return new Promise((res, rej) => {
      const urlForMail = this.configService.get('HTTP_HOST') + ":" + this.configService.get("HTTP_PORT") + "/users/confirmation/" + user._id.toHexString();
      const template = join(__dirname, '..', 'view/confirmEmail/confirm.ejs');
      
      const dataForTemplate = {
        email: user.email, 
        name: user.name, 
        position: user.position, 
        url: urlForMail
      };

      const message = {
        to: user.email,
        subject: "Подтвердите регистрацию",
        template: template,
        context: dataForTemplate
      };

      res(message);

    });
  };

  private prepareMailPageForAdmin(user:User) {
    return new Promise((res, rej) => {
      const id = user._id.toHexString();
      const urlForMail = this.configService.get('HTTP_HOST') + ":" + this.configService.get("HTTP_PORT") + "/users/verifed/ksdjfoiweu2384slkdfj/" + id;
      const template = join(__dirname, '..', 'view/confirmEmail/verife.ejs');

      const dataForTemplate = {
        email: user.email, 
        name: user.name, 
        position: user.position, 
        created: user.created,
        url: urlForMail
      }

     const message = {
        to: this.configService.get('AUTH_USER'),
        subject: "Проверь нового пользователя",
        template: template,
        context: dataForTemplate
      };

      res(message);
    });
  };

  async sendMailToAdmin(id: string) {
   const user:User = await this.userRepository.findOne({ "_id": id });
   const readyMessageAdmin = await this.prepareMailPageForAdmin(user);
   const resInfoSendMailToAdmin = await this.mailSendService.sendMail(readyMessageAdmin);
   return resInfoSendMailToAdmin;
  };


};






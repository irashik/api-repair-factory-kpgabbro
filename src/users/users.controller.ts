import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Logger, } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/quards/jwt-auth.guard';





@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) 
  
  {  }


  // Регистрация пользователя
  @Post('register')
  @UsePipes(new ValidationPipe()) 
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    let response =  await this.usersService.create(createUserDto);
    Logger.debug('controller response= ' + JSON.stringify(response));
    return response;
  };




  
  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);

  }



  @Get('confirmation/:hash')
  async updateForConfirmation(@Param('hash') id: string): Promise<any> {
    let updateUserDto  = new UpdateUserDto();
    updateUserDto.confirmation = true;

    const mailToAdmin = await this.usersService.sendMailToAdmin(id);
    const confirmUser = await this.usersService.update(id, updateUserDto);

    return new Array(confirmUser, mailToAdmin);

  };

  
  
  @Get('verifed/ksdjfoiweu2384slkdfj/:hash')
  updateForVerifed(@Param('hash') id: string) {
    let updateUserDto = new UpdateUserDto();
    updateUserDto.verifed = true;
    return this.usersService.update(id, updateUserDto);
  };
 

}




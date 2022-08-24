import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Logger, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@App/auth/quards/jwt-auth.guard';





@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) 
  
  {  }


  // Регистрация пользователя
  @Post('register')
  @UsePipes(new ValidationPipe()) 
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    let response =  await this.usersService.create(createUserDto);
    return response;
  };




  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (e) {
      throw new NotFoundException(e);

    }
  }
  
  @UseGuards(JwtAuthGuard)
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

    Logger.debug(new Array(confirmUser, mailToAdmin)); //todo

    if (confirmUser.confirmation === true) {
      return this.usersService.resposeForUser();
    } else {
      throw new NotFoundException(confirmUser.confirmation);
    };

  };

  
  
  @Get('verifed/ksdjfoiweu2384slkdfj/:hash')
  updateForVerifed(@Param('hash') id: string) {
    let updateUserDto = new UpdateUserDto();
    updateUserDto.verifed = true;
    return this.usersService.update(id, updateUserDto); //todo
  };
 

}




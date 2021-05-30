import { Controller, Get, Post, Body, Patch, Param, Query, Delete, UsePipes, ValidationPipe, HttpCode, Request, Logger, Req, } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/quards/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { TokenExpiredError } from 'jsonwebtoken';
import { Query as QueryMongoose } from 'mongoose';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

  ) {}


  @Get()
  root(): string {
    return "hello world auth!";
  }


    
  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto) {
      return this.authService.signIn(loginUserDto);
  }


  // нужно добавить проверку, не залогинен ли пользователь...
  // добавь переадресацию если прошел проверку или приветствие??


  

  @UseGuards(JwtAuthGuard)
  @Post('refresh-token')
  refresh(): string {
    return this.authService.refreshToken();
  } 

  
  



  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Query() query: Record<string, any>): Promise<any> {
    
    Logger.debug("controller work== " + JSON.stringify(query.id));

    return this.authService.logout(query.id);
    
  }

  




  
// @Get('/confirm')
// async confirm(@Query(new ValidationPipe()) query: ConfirmAccountDto): Promise<boolean> {
//   await this.authService.confirm(query.token);
//   return true;
// }

// @Post('/forgotPassword')
// async forgotPassword(@Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordDto): Promise<void> {
//   return this.authService.forgotPassword(forgotPasswordDto);
// }  

// @Patch('/changePassword')
// @UseGuards(JwtAuthGuard)
// async changePassword(
//   @GetUser() user: IUser,
//   @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
// ): Promise<boolean> {
//   return this.authService.changePassword(user._id, changePasswordDto);
// }




}

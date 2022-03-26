import { Controller, Get, Post, Body, Patch, Param, Query, Headers, Delete, UsePipes, ValidationPipe, HttpCode, Request, Logger, Req, NotFoundException, Header, } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/quards/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { IAuthUserResponse } from './interface/authUser.interface';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

  ) {}


  @Get()
  root(): string {
    return "it is auth controller!";
  }
    


  @Post('login')
  @HttpCode(200)

  async login(@Body() loginUserDto: LoginUserDto): Promise<IAuthUserResponse> {

    if(loginUserDto.email && loginUserDto.password) {

      let a =  await  this.authService.signIn(loginUserDto); 
      Logger.log(JSON.stringify(a));
      return a;
      
      
    } else {
      throw new NotFoundException('check email or password');
    }
  };
    
  @Get('refresh-token')
  async refresh(@Headers('refreshToken') refreshToken: string): Promise<any> {
    try {
      return await this.authService.updateRefreshToken(refreshToken);
    } catch {
      return 'no valid refresh';
    }
  };

  
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Query() query: Record<string, any>): Promise<any> {

    Logger.log('logout controller = ' + JSON.stringify(query));
    
    // todo Record<string наверное нужно UserDto

      try {
        const res = await this.authService.logout(query.userId);
        if (res) {
          const response = `${query.userName} is logout`;
          return Promise.resolve({response});
        }        
        throw new NotFoundException(res);
      } 
      catch(error) {
        throw new NotFoundException(error);
      }
  };

  


// TODO

//   @Post('forgotPassword')
//   async forgotPassword(@Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordDto): Promise<void> {
//     return this.authService.forgotPassword(forgotPasswordDto);
//   }  


// @Patch('/changePassword')
// @UseGuards(JwtAuthGuard)
// async changePassword(
//   @GetUser() user: IUser,
//   @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
// ): Promise<boolean> {
//   return this.authService.changePassword(user._id, changePasswordDto);
// }




}


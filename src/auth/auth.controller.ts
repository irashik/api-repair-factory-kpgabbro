import { Controller, Get, Post, Body, Patch, Param, Query, Headers, Delete, UsePipes, ValidationPipe, HttpCode, Request, Logger, Req, NotFoundException, } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/quards/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';


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
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {

    if(loginUserDto.email && loginUserDto.password) {
      return this.authService.signIn(loginUserDto); 
    } else {
      throw new NotFoundException('check email or password');
    }
  }
    
  @Get('refresh-token')
  async refresh(@Headers('refreshToken') refreshToken: string): Promise<any> {
    try {
      return this.authService.updateRefreshToken(refreshToken);
    } catch {
      return Promise.reject('RefreshToken is not valide');
    }
  } 

  
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Query() query: Record<string, any>):Promise<string> {

    
    // todo Record<string наверное нужно UserDto

      try {
        const res = await this.authService.logout(query.userId);
        if (res) {
          Logger.debug('response authService = ' + res);
          const response = `${query.userName} is logout`;
          return Promise.resolve(response);
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


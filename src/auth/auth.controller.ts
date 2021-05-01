import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpCode, Request, Logger, } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/quards/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Query } from 'mongoose';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

  ) {}


  @Post('refresh-token')
  refresh(): string {
    return this.authService.refreshToken();
  } 

@Get('access_token')

  

  
  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto) {
      return this.authService.signIn(loginUserDto);
  }


  // нужно добавить проверку, не залогинен ли пользователь...
  // добавь переадресацию если прошел проверку или приветствие??

  
  // async signIn(@Request() req) {
  //   Logger.debug(req.user);

  //   return this.authService.signIn(req.user);
  // }


  //@UseGuards(JwtAuthGuard)
  // @Post('login')
  // @HttpCode(200)
  // async signIn(@Request() req) {
  //   Logger.debug(req.user);
  //   return this.authService.signIn(req.user);
  // }


  @Get()
  root(): string {
    return "hello world auth!";
  }

  



  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(userId: string, refreshToken: string): Promise<any> {
    
    return this.authService.logout(userId, refreshToken);


  }

  

  // @Post('login')
  // @HttpCode(200)
  // login(@Body() loginUserDto: LoginUserDto): Observable<any> {
    
  //   return this.authService.signIn(loginUserDto).pipe(
  //     map((jwt: string) => {
  //       return {
  //         access_token: jwt,
  //         token_type: 'JWT',
  //         expires_in: 10000
  //       }
  //     })
  //   )
  // }



  // @UseGuards(JwtAuthGuard)
  // @Post('auth/login')
  // async signIn(@Request() req) {

  //   return this.usersService.login(req.user);
  //   //return this.authService.signIn(req.user);
  // }


  
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

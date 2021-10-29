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
    return "hello it is auth controller!";
  }
    
  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto) {
      return this.authService.signIn(loginUserDto);
      // todo можно указать, по какой именно причине выдает ошибку об авторизации?
      
  }
    
  @Get('refresh-token')
  refresh(@Headers('refreshToken') refreshToken: string): any {
    /*
    этот контроллер нужен, в том случае если авторизация по аксес токену не прошла, и нужно 
    сверить рефреш токен и если все хорошо то выдать новый рефреш и акссес
    или запретить доступ.

    */

    Logger.debug(refreshToken);

    return  this.authService.updateRefreshToken(refreshToken);
    

  } 

  
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Query() query: Record<string, any>): string {
      try {

        this.authService.logout(query.userId);
        // не могу прочитать на клиенте этот текст
        return `${query.userName} is logout`;
        

      } 
      catch(error) {
        throw new NotFoundException(error);
      }

    // может туть немного конкретней нужно забрать данные
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


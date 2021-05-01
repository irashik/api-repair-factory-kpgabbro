import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { SignOptions } from 'jsonwebtoken';
import { CreateUserTokenDto } from 'src/token/dto/create.user.token.dto';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/users/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService,
        private configService: ConfigService
        
        ) {}

       
        async signIn(user: any) {

            // проверить что пароль совпадает 
            // выпустить токен

            const userValid = this.validateUser(user.email, user.password);

            if (await userValid) {
                const payload = {
                    username: user.name, 
                    email: user.email,
                    sub: user._id
                }

                const tokenOptions = {
                    expiresIn: this.configService.get('expiresIn'),
                };
                
                const token = await this.generateToken(payload, tokenOptions);
                //this.saveToken(token); не нужно сохранять
                //this.tokenService.create(token);

                

                return {
                    expiresIn: this.configService.get('accessToken_expiresIn'),
                    accessToken: token,
                    user_id: payload,
                    status: 200,
                    refreshToken: null,
                }

            } else {
                throw new UnauthorizedException();
            }
        }


        private async validateUser(email: string, pass: string): Promise<any> {
            const user = await this.userService.findOneAuth(email);
            const match = await bcrypt.compare(pass, user.password);

            if(user && match) {
                const { password, ...result } = user;
                return result;
            } else {
                return null;
            }
            
        }

        private async generateToken(data, options?: SignOptions): Promise<string>{
            
            return this.jwtService.sign(data, options);
        }


       

       






        private async verifyToken(token): Promise<any> {
            try {
                const data = this.jwtService.verify(token);
                const tokenExists = await this.tokenService.exists(data._id, token);
                
                if (tokenExists) {
                    return data;
                }
                throw new UnauthorizedException();
            } catch (error)  {
                throw new UnauthorizedException();
            }
        }


       private async saveToken(createUserTokenDto: CreateUserTokenDto) {
           const userToken = await this.tokenService.create(createUserTokenDto);

           return userToken;
       } 

    //    generateJWT(user: User): Observable<string> {
    //         return from<string>(this.jwtService.signAsync({user}));
    //    }
       


       


    //    hashPassword(password: string): Observable<string> {
    //     const salt = this.configService.get('saltRounds');
    //     return from<string>(bcrypt.hash(password, salt));
    //    }




    //    comparePassword(newPassword: string, passwordHash: string): Observable<any | boolean> {
    //        return of<any | boolean>(bcrypt.compare(newPassword, passwordHash));
           
    //    }

    async logout(userId: string, refreshToken: string): Promise<any> {
        await this.tokenService.deleteRefreshToken(userId, refreshToken);
        

    }


    refreshToken() {
        return 'refresh-token';
    }



}


import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';
import { SignOptions, verify } from 'jsonwebtoken';
import { CreateUserTokenDto } from 'src/token/dto/create.user.token.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as ms from 'ms';
import { Condition } from 'mongodb';
import { User } from 'src/users/schema/user.schema';




@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService,
        private configService: ConfigService
        ) {}

       
        async signIn(user: any) {

            const userValid = await this.validateUser(user.email, user.password);

            if (userValid) {
                const user = await userValid;
                const accesstoken = await this.createAccessToken(user);
                const refreshToken = await this.createRefreshToken(user);

                return {
                    accessToken: accesstoken,
                    refreshToken: refreshToken,
                    status: 200
                }

            } else {
                throw new UnauthorizedException();
            }
        }
        
        private async validateUser(email: string, pass: string): Promise<any> {
            const user = await this.userService.findOneAuth(email);
            const match = await bcrypt.compare(pass, user.password);
            if(user && match) {
                return user;
            } else {
                return null;
            }
        }

        private async generateToken(payload, options?: SignOptions): Promise<string>{
            return this.jwtService.sign(payload, options);
        }

        private async saveRefreshToken(createUserTokenDto: CreateUserTokenDto) {
            const userToken = await this.tokenService.create(createUserTokenDto);
            return userToken;
            // что будет в случае ошибки? вместо значение вернется исключение.
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

    private async createAccessToken(user): Promise<string> {
            const payload = {
                username: user.name,
                email: user.email,
                sub: user.id
            }
            const tokenOptions = {
                expiresIn: Math.floor(ms(this.configService.get('accessToken_expiresIn'))/1000),
                
            };

            const accesstoken = await this.generateToken(payload, tokenOptions);
            return accesstoken;

    }

    private async createRefreshToken(user): Promise<string> {
            const refreshPayload = {
                sub: user.id,
                iat: Math.floor(Date.now()/1000),
            };

            
            const refreshTokenOptions = {
                expiresIn:  Math.floor(ms(this.configService.get('refreshToken_expiresIn'))/1000), // потому что метод generateToken принимает секудны.
                issuer: "api-repair-factory-kpgabbro",
                audience: "users",
            }

            const refreshToken = await this.generateToken(refreshPayload, refreshTokenOptions);

            const createUserTokenDto = Object.assign({
                                            token: refreshToken
                                        },
                                        refreshPayload,
                                        refreshTokenOptions
                                        );

            const saveRefresh = await this.saveRefreshToken(createUserTokenDto);
            
            if (saveRefresh) {
                return refreshToken;

            } else {
                throw "refreshToken not saved!";
            }
            
        
        
        
        
            

    }       

    async logout(userId: Condition<User>): Promise<any> {
        const result = await this.tokenService.deleteAll(userId);
        return result;

    }

    async updateRefreshToken(refreshToken: string): Promise<any> {
        
        /* принимает refreshToken 
            декодирует рефреш токен и проверяет подпись, срок жизни, извлекает данные

        */


        try {
            const decoded: any = await verify(refreshToken, this.configService.get('jwt_secret'))


            if(decoded) {
                const newAccessToken = create
                const newRefreshToken = createRefresh
                


                return {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                    status: 200
                }

            } else {
                throw new UnauthorizedException();
            }

         



            } catch(e) {
                throw new UnauthorizedException();
            }

    }





    private async checkRefreshToken(token: string, uId: Condition<User>): Promise<boolean> {
        
        /* Проверить существование в базе + проверить время жизни и проверить еще совбадает ли id user.??
    
        */
      
        const checkRefresh = await this.tokenService.exists(token, uId);
        const decoded: any = await verify(token, this.configService.get('jwt_secret'))
    
    
        
        return false;
        //
    
    }


}



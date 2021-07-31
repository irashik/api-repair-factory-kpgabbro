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
import { LoggerModule } from 'src/logger/logger.module';




@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService,
        private configService: ConfigService
        ) {}

       
        async signIn(user: any) {

            Logger.debug("user==" + JSON.stringify(user));

            const userValid = await this.validateUser(user.email, user.password);

            if (userValid) {
                Logger.log('userValid==' + userValid);
                const user = await userValid;
                const accesstoken = await this.createAccessToken(user);
                const refreshToken = await this.createRefreshToken(user);

                Logger.debug(JSON.stringify(user));

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

            // todo ошибка если емейл совсем не верный приходит.
            
            const user = await this.userService.findOneAuth(email);
            const match = await bcrypt.compare(pass, user.password);
            if(user && match) {
                return user;
            } else {
                Logger.debug("no user");
                throw new UnauthorizedException('no user');
                return null;
            }
        }

        private async generateToken(payload, options?: SignOptions): Promise<string>{
            return this.jwtService.sign(payload, options);
        }

        private async saveRefreshToken(createUserTokenDto: CreateUserTokenDto) {
            const userToken = await this.tokenService.create(createUserTokenDto);
            return userToken;
            // todo что будет в случае ошибки? вместо значение вернется исключение.
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

    
    async updateRefreshToken(refreshToken: string): Promise<any> {
        
        /* принимает refreshToken 
            проверяет рефреш токен
            удали старый токен из базы..
            создает новую пару Access & refresh tokens
            возвращает ее.
        */


        try {
            const checkDbtoken: any = await this.checkRefreshToken(refreshToken);

            if(checkDbtoken) {
                const user = await this.userService.findOne(checkDbtoken.sub);
                await this.deleteRefresh(refreshToken);

                const newAccessToken = await this.createAccessToken(user)
                const newRefreshToken = await this.createRefreshToken(user)
               
                return {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                    status: 200
                }

            } else {
                throw new UnauthorizedException();
            }
        } catch(e) {
                throw new UnauthorizedException('Error update refreshtoken');
        }

    }

    private async checkRefreshToken(refreshToken): Promise<any> {
        // todo здесь возможно нужна работа над исключением если в базе нет ничего. ??
        try {
            const decoded: any = this.jwtService.verify(refreshToken, this.configService.get('jwt_secret'));
            
            if (decoded) {
                const tokenExists = await this.tokenService.exists(refreshToken);
                return tokenExists;
            }
            
            throw new UnauthorizedException('error verify refreshtoken');
        } catch (error)  {
            throw new UnauthorizedException('error verifyToken method');
        }
    }

    private async deleteRefresh(refreshToken): Promise<boolean> {
        const result = await this.tokenService.delete(refreshToken);
        return result;
    }

    async logout(userId: Condition<User>): Promise<any> {
        const result = await this.tokenService.deleteAll(userId);
        return result;

    }


}



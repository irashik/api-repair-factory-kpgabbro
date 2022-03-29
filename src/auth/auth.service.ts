import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from "@App/token/token.service";
import { UsersService } from "@App/users/users.service";
import { SignOptions } from 'jsonwebtoken';
import { CreateUserTokenDto } from "@App/token/dto/create.user.token.dto";
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Condition } from 'mongodb';
import { User } from "@App/users/schema/user.schema";
import { IAuthUserResponse } from "@App/auth/interface/authUser.interface"


import { RefreshToken } from "@App/token/schema/refresh.token.schema";
import { LoginUserDto } from "@App/users/dto/login-user.dto";




@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService,
        private configService: ConfigService
        )
    {}

       
    async signIn(user: LoginUserDto): Promise<IAuthUserResponse> {

        try {
            const userValid = await this.validateUser(user.email, user.password);
            const accesstoken:string = await this.createAccessToken(userValid);
            const refreshToken:string = await this.createRefreshToken(userValid);

            const result:IAuthUserResponse = Object({
                accessToken: accesstoken,
                refreshToken: refreshToken,
                userName: userValid.name,
                userId: userValid._id,
                status: 200
            });

            
            return result;
        }
        catch (e) {
            throw new UnauthorizedException('Пользователь не найден или пароль неправильный:' + e);
        }
    };
        
    async updateRefreshToken(refreshToken: string): Promise<any> {
        try {
            const checkDbtoken:any = await this.checkRefreshToken(refreshToken);
            const user = await this.userService.findOne(checkDbtoken.sub[0]);
            await this.deleteRefresh(refreshToken);

            const newAccessToken = await this.createAccessToken(user)
            const newRefreshToken = await this.createRefreshToken(user)
            
            const result:IAuthUserResponse =  {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                userName: user.name,
                userId: user._id,
                status: 200
            }

            return result;
        
            
        } catch(e) {
                throw new UnauthorizedException('Error check refreshToken. error=' + e);
        }

    };

    async logout(userId: Condition<User>): Promise<any> {
        try {
            return await this.tokenService.deleteAll(userId);
        }
        catch(e) {
            throw new Error('tokens not deleted');
        }
    };

    




    private async validateUser(email: string, pass: string): Promise<User> {
        try {
            const user = await this.userService.findOneAuth(email);
            const match = await bcrypt.compare(pass, user.password);
           
            if(user._id && match && user.confirmation && user.verifed) {
                return user;
            } else {
                throw new UnauthorizedException('no user');
            }
        } catch (e) {
            throw new UnauthorizedException('no user');
        }
    };

    private async generateToken(payload:any, options?: SignOptions): Promise<string>{
        return this.jwtService.sign(payload, options);
        
    };

    private async saveRefreshToken(createUserTokenDto: CreateUserTokenDto): Promise<any> {
        return await this.tokenService.create(createUserTokenDto);
    } 
 
    private async createAccessToken(user: User): Promise<string> {
        const payload = {
            username: user.name,
            email: user.email,
            sub: user._id.toHexString()
        }
        const equalsMs:number = this.configService.get('accessToken_expiresIn');
        const expiresIn_ms = Math.floor(equalsMs/1000);
        const tokenOptions:SignOptions = {
            expiresIn: expiresIn_ms
        };

        try {
            const accesstoken:string = await this.generateToken(payload, tokenOptions);
            return accesstoken;
        }
        catch(e) {
            throw new Error("Unkown error create AccessToken");
        }
    };

    private async createRefreshToken(user: User): Promise<string> {
        const refreshPayload = {
            sub: user._id.toHexString(),
            iat: Math.floor(Date.now()/1000),
        };
        const equalsMs:number = this.configService.get('refreshToken_expiresIn');
        const expiresIn_ms = Math.floor(equalsMs/1000); // потому что метод generateToken принимает секудны.
        const refreshTokenOptions = {
            expiresIn:  expiresIn_ms, 
            issuer: "api-repair-factory-kpgabbro",
            audience: "users",
        }
        try {
            const refreshToken = await this.generateToken(refreshPayload, refreshTokenOptions);
            const createUserTokenDto = Object.assign(
                                            {
                                                token: refreshToken
                                            },
                                            refreshPayload,
                                            refreshTokenOptions
                                        );
        
           await this.saveRefreshToken(createUserTokenDto);
           return refreshToken;
        } catch (e) {
            throw new Error("refreshToken not saved!");
        }
    };

    private async checkRefreshToken(refreshToken:string): Promise<RefreshToken> {
        try {
            const decoded:any = this.jwtService.verify(refreshToken, this.configService.get('jwt_secret'));
            if (decoded) {
                return await this.tokenService.exists(refreshToken);
                // todo проверить принадлежность токена юзеру.
            } else {
                throw new UnauthorizedException('error verify refreshtoken');
            }
        } catch (error)  {
            throw new UnauthorizedException('error verifyToken method');
        }
    };

    private async deleteRefresh(refreshToken:string): Promise<boolean> {
        return await this.tokenService.delete(refreshToken);
    };

};



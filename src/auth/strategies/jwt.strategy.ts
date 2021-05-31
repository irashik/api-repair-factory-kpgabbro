import { HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { TokenService } from "src/token/token.service";
import { User, UserDocument } from "src/users/schema/user.schema";
import { verify } from 'jsonwebtoken';
import { UsersService } from "src/users/users.service";
import { Condition } from "mongodb";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly tokenService: TokenService,
        private readonly userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('jwt_secret'),
            passReqToCallback: true,
            ignoreExpiration: false,
        });

    }



    async validate(req, user: Partial<UserDocument>) {
        
        const token = req.headers.authorization.slice(7); // берем accesstoken

        const refreshToken = req.headers.
        const decoded: any = verify(token, this.configService.get('jwt_secret'))
        
        Logger.log('decoded token==' + JSON.stringify(decoded));

        // нужен ли этот юзер из базы??
        const verifyUser = await this.userService.findOne(decoded.sub);

        Logger.log(verifyUser);
        
        if (verifyUser) {
            
            // todo нужно ли возвращать юзера целиком?
            return verifyUser;

        } else {
            throw new UnauthorizedException("User not found");
        }




    }


    // async validate(payload: any) {
    //     return { userId: payload.sub, username: payload.username };
    // }

    async checkRefreshToken(token: string, uId: Condition<User>) {
        
        /* Проверить существование в базе + проверить время жизни и проверить еще совбадает ли id user.??

        */
        const checkRefresh = await this.tokenService.exists(token, uId);

        //

    }

}

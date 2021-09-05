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
import { doesNotThrow } from "node:assert";

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


    // найти юзера надо

    async validate(req, user: Partial<UserDocument>) {
        const accessToken = req.headers.authorization.slice(7); // берем accesstoken
        const accessResult: any = await verify(accessToken, this.configService.get('jwt_secret'))


        /*
            accessResult= { 
                "username":"user",
                "email":"test@test.ru",
                "sub":"608aa69e3c966fc4f6c99e4a","iat":1630250945,"exp":1630251545}
        */

       // Logger.debug('user.id== ' + user.id);
        //Logger.debug('accessResult= ' + JSON.stringify(accessResult));

//        if (accessResult && accessResult.sub === user.id) {


        if (accessResult) {
            return accessResult;
        } else {
            throw new UnauthorizedException();
        }
    }
}


    
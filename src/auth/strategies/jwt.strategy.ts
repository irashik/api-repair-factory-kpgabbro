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
        const accessToken = req.headers.authorization.slice(7); // берем accesstoken
        const accessResult: any = await verify(accessToken, this.configService.get('jwt_secret'))



        Logger.debug('accessResult= ' + JSON.stringify(accessResult));

        if (accessResult && accessResult.sub === user.id) {
            return accessResult;
        } else {
            throw new UnauthorizedException();
        }
    }
}


    
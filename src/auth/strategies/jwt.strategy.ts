import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";
import { ExtractJwt } from "passport-jwt";
import { TokenService } from "src/token/token.service";
import { UserDocument } from "src/users/schema/user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly tokenService: TokenService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('jwt_secret'),
            passReqToCallback: true,
            ignoreExpiration: false,
        });

    }

    async validate(req, user: Partial<UserDocument>) {
        const token = req.headers.authorization.slice(7);
        const tokenExists = await this.tokenService.exists(user._id, token);
        
        if (tokenExists) {
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }


    // async validate(payload: any) {
    //     return { userId: payload.sub, username: payload.username };
    // }




}

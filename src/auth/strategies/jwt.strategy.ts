import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { UserDocument } from "@App/users/schema/user.schema";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
       
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('jwt_secret'),
            passReqToCallback: true,
            ignoreExpiration: false,
        });

    }


    async validate(req, user: Partial<UserDocument>) {
       
            const accessToken = req.headers.authorization.slice(7);
            const accessResult:any = this.jwtService.verify(accessToken, this.configService.get('jwt_secret'));


            /*
                accessResult= { 
                    "username":"user",
                    "email":"test@test.ru",
                    "sub":"608aa69e3c966fc4f6c99e4a","iat":1630250945,"exp":1630251545}
            */
            // Logger.debug('user.id== ' + user.id);
            //Logger.debug('accessResult= ' + JSON.stringify(accessResult));
            //if (accessResult && accessResult.sub === user.id) {


            if (accessResult) {
                return accessResult;
            } else {
                throw new UnauthorizedException();
            }
       
    };
};


    
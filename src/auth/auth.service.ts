import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { SignOptions } from 'jsonwebtoken';
import { CreateUserTokenDto } from 'src/token/dto/create.user.token.dto';



@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService
        
        ) {}


        sitnUp(createUserDto: CreateUserDto) {

        }

        signIn(user) {
           
            const options = {};
            

            return this.generateToken(user, options);


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


}


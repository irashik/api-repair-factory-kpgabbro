import { CreateUserDto } from "@App/users/dto/create-user.dto";
import { recordUser } from "./mockUserRepository";



export const mockUserService = {
    create: jest.fn((createUserDto: CreateUserDto) => {
        if(createUserDto) {
            return Promise.resolve(recordUser);
        } else {
            throw new Error('user a cant create');
        }
    }),

    
    update: jest.fn(() => {
    
    }),

    findOneAuth: jest.fn((email) => {
        if (email === 'user@test.ru') {
            return Promise.resolve(recordUser)
        } else {
            throw new Error('user email not found');
        }
    }),

    findOne: jest.fn((accessUserSub) => {
        if (accessUserSub === '608aa69e3c966fc4f6c99e4a') {
            return Promise.resolve(recordUser)
        } else {
            throw new Error('not found is userId. ==' + accessUserSub)
        }
    })



      
    
};


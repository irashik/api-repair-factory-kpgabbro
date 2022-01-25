import { CreateUserDto } from "src/users/dto/create-user.dto";



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

export const recordUser = {
    _id: '608aa69e3c966fc4f6c99e4a',
    name: 'user',
    email: 'user@test.ru',
    password: '$2b$10$afrAgLfatFihtknMwbbhJuEMQ9/e50qOmMPsXd98C2wPw4Cp.aTaS', // 'test',
    confirmation: true,
    verifed: true,
    created: new Date(2022, 1, 20),
    admin: true,
    position: "position"
};

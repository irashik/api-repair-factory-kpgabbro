import { CreateUserDto } from "src/users/dto/create-user.dto";



 export const mockUserRepository = {
    create: jest.fn((newUser) => {
        if(newUser === recordCreateUser) {
            return Promise.resolve(recordUser);
        } else {
            throw new Error('not user data')
        }
        
        

    }),

    findOne: jest.fn((id) => {

        if(id._id === '608aa69e3c966fc4f6c99e4a') {
            return Promise.resolve(recordUser);
        }
        else {
            throw new Error('not user');
        }
    })




};




    
   

    export const recordUser = {
        _id: '608aa69e3c966fc4f6c99e4a',
        name: 'user',
        email: 'user@test.ru',
        password: '$2b$10$afrAgLfatFihtknMwbbhJuEMQ9/e50qOmMPsXd98C2wPw4Cp.aTaS', //test
        confirmation: true,
        verifed: true,
        created: new Date(2022, 1, 20),
        admin: true,
        position: "position"
    };

    export const recordCreateUser = {
        name: 'user',
        email: 'user@test.ru',
        password: 'test', //$2b$10$afrAgLfatFihtknMwbbhJuEMQ9/e50qOmMPsXd98C2wPw4Cp.aTaS'
        position: "position"
    };
    
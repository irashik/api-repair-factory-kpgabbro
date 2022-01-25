import { recordRefTokenInDb, recordTokenDecoded } from 'src/__mocks__/mockJwtService';

export const mockTokenService = {
    create: jest.fn((createUserTokenDto) => {
        if(createUserTokenDto) {
            return Promise.resolve(recordTokenDecoded);
        }
    }),

    delete: jest.fn((refToken) => {
        if(refToken) {
            return Promise.resolve(true)
        } else {
            Promise.reject(false);
        }
        

    }),
    deleteAll: jest.fn((userId) => {
     if (userId === 'userId') {
         return Promise.resolve(true);
     }
     else {
         return Promise.reject(false)
     }
    }),

    exists: jest.fn((refToken) => {
        if(refToken) {
           return Promise.resolve(recordRefTokenInDb) // так не срабатывает
           //return recordTokenDecoded
        } else {
            throw new Error('not refToken');
        }
    }),

    

    

      
    
}



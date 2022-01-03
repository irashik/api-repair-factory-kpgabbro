

export const mockJwtService = {
    verify: jest.fn((token, jwt_secret) => {
      if (token === validtoken && jwt_secret) {
        return recordTokenDecoded
      } else {
        return 'token or jwtSecret no valid';
      }
      
    }),

    sign: jest.fn((payload, options) => {
      if(payload && options) {
        return 'newToken';
      } else {
        throw new Error();
      }
    })
  }

  
  export const recordTokenDecoded:any = {
    username:"user",
    email:"test@test.ru",
    sub:"608aa69e3c966fc4f6c99e4a",
    iat:1630250945,
    exp:1630251545
  }

  export const validtoken:string = "tokenaklsdjfkwieuriwourwioksd"
  
export const mockJwtService = {

    verify: jest.fn((token, jwt_secret) => {
      if (token === validtoken && jwt_secret) {
        return Promise.resolve(recordTokenDecoded);
      } else {
        throw new Error('token or jwtSecret no valid');
      }
      
    }),

    sign: jest.fn((payload, options) => {
      if(payload && options) {
        return 'newToken';
      } else {
        return 'error'; //throw new Error();
      }
    })
  }

  
  export const recordTokenDecoded:any = {
    username:"user",
    email:"test@test.ru",
    sub:"608aa69e3c966fc4f6c99e4a",
    iat:1630250945,
    exp:1630251545
  
  };

  export const recordRefTokenInDb:any = {
    _id: "60ace741350b1b2a1cf56f5d",
    sub: ["608aa69e3c966fc4f6c99e4a"],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGFhNzYzNzc1OTE2YmRlZjgwMmIwYzQiLCJpYXQiOjE2MjE5NDQxMjkwMjYsImV4cCI6MTYyNzEyODEyOTAyNiwiYXVkIjoidXNlcnMiLCJpc3MiOiJhcGktcmVwYWlyLWZhY3Rvcnkta3BnYWJicm8ifQ.P8RfdfkCgSD3okpkXvfaJN0KoJ8CttKnpZFslS6yIBo",
    iat: 1621944129026,
    expiresIn: 5184000000,
    issuer: "api-repair-factory-kpgabbro",
    audience: "users",
    __v: 0
  };

  export const validtoken:string = "tokenaklsdjfkwieuriwourwioksd";
  
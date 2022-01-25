export const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key == "saltRounds") {
        return 2;
      }
      if(key == 'HTTP_HOST') {
        return 'testhost'
      }
      if(key == 'HTTP_PORT') {
        return 3500
      }
      if(key === 'jwt_secret') {
        return 'jwt_secret'
      }
      if(key === 'accessToken_expiresIn') {
        const ms = 1000 * 60 * 60 * 10
        return ms;
      }
      if(key === 'refreshToken_expiresIn') {
        const ms = 1000 * 60 * 60 * 24 * 60
        return ms;
      }

      else {
        return null;
        //throw new Error('config key not found');
      }
    })
}

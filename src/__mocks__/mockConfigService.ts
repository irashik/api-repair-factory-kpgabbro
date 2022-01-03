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
        return 1000 * 60 * 60 * 10
      }
      if(key === 'refreshToken_expiresIn') {
        return 1000 * 60 * 60 * 24 * 60
      }

      else {
        throw new Error('config key not found');
      }
    })
}

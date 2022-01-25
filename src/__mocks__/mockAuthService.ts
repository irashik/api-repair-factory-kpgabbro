


 export let mockAuthService = { 
    updateRefreshToken: jest.fn((token) => {
      if (token === refreshToken) return Promise.resolve(response)
      throw new Error('error Update token')
    }),

    signIn: jest.fn((login) => {
      
      if (login.email == 'test@test.ru' && login.password == 'password') {

        return Promise.resolve(response);
      } else {
        return Promise.reject('not valid')
      }
      
    }),

    logout: jest.fn((userId) => {
      if(userId === 'userId') {
        return Promise.resolve(true)
      } else {
        return Promise.reject(false)
      }
    })

};



export const response = {
    accessToken: 'newAccessToken',
    refreshToken: 'newRefreshToken',
    userName: 'test',
    userId: 'testId',
    status: 200
}

export const refreshToken = "token"

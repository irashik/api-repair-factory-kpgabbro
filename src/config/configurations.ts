export default () => ({
    
    HTTP_PORT: parseInt(process.env.HTTP_PORT),
    HTTP_HOST: process.env.HTTP_HOST,
    

    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_PORT: parseInt(process.env.MONGODB_PORT),

    jwt_secret: process.env.JWT_SECRET,
    refreshToken_expiresIn: "60d",
    accessToken_expiresIn: "10m",
    

    
    saltRounds: 10,
    


    
})
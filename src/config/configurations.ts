export default () => ({
    
    HTTP_PORT: process.env.HTTP_PORT,
    HTTP_HOST: process.env.HTTP_HOST,

    HTTP_PORT_REDIRECT: process.env.HTTP_PORT_REDIRECT,


    CLIENT_HTTP_HOST: process.env.CLIENT_HTTP_HOST,
    CLIENT_HTTP_PORT: process.env.CLIENT_HTTP_PORT,
    

    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_NAME: process.env.MONGODB_NAME,

    
    jwt_secret: process.env.JWT_SECRET,

    refreshToken_expiresIn: 1000 * 60 * 60 * 24 * 30, //"30 days",
    accessToken_expiresIn: 1000 * 60 * 60 * 24, // 24 hours

       
    

    
    saltRounds: 10,
    VERIFED_KEY: process.env.VERIFED_KEY,
    


    // MAILER TRANSPORT
    TRANSPORT_HOST: process.env.TRANSPORT_HOST,
    TRANSPORT_PORT: process.env.TRANSPORT_PORT,
    AUTH_USER: process.env.AUTH_USER,
    AUTH_PASSWORD: process.env.AUTH_PASSWORD,




})
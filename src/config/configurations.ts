export default () => ({
    
    HTTP_PORT: process.env.HTTP_PORT,
    HTTP_HOST: process.env.HTTP_HOST,
    

    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_NAME: process.env.MONGODB_NAME,

    jwt_secret: process.env.JWT_SECRET,

    refreshToken_expiresIn: 1000 * 60 * 60 * 24 * 30, //"30 days",
    accessToken_expiresIn: 1000 * 60 * 60 * 3, //3hours

    //long millisInDay = 1000 * 60 * 60 * 24;
    //long millisInHour = 1000 * 60 * 60;
    

    
    saltRounds: 10,
    VERIFED_KEY: process.env.VERIFED_KEY,
    


    // MAILER TRANSPORT
    TRANSPORT_HOST: process.env.TRANSPORT_HOST,
    TRANSPORT_PORT: process.env.TRANSPORT_PORT,
    AUTH_USER: process.env.AUTH_USER,
    AUTH_PASSWORD: process.env.AUTH_PASSWORD,




})
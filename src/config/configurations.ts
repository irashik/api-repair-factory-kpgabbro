export default () => ({
    
    HTTP_PORT: parseInt(process.env.HTTP_PORT),
    HTTP_HOST: process.env.HTTP_HOST,
    

    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_PORT: parseInt(process.env.MONGODB_PORT),

    jwt_secret: process.env.JWT_SECRET,

    refreshToken_expiresIn: 1000 * 60 * 60 * 24 * 60, //"60 days",
    accessToken_expiresIn: 1000 * 60 * 60 * 10, //10hours

    //long millisInDay = 1000 * 60 * 60 * 24;
    //long millisInHour = 1000 * 60 * 60;
    

    
    saltRounds: 10,
    VERIFED_KEY: "8ffTIwOWXB4yEiV1WL",
    


    AdminEmail: 'sharon.abernathy15@ethereal.email',
    






})
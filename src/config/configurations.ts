export default () => ({
    
    HTTP_PORT: parseInt(process.env.HTTP_PORT),
    HTTP_HOST: process.env.HTTP_HOST,
    

    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_PORT: parseInt(process.env.MONGODB_PORT),

    session: {
        name: process.env.SESSION_NAME,
        secret: process.env.SESSION_SECRET,
        key: process.env.SESSION_KEY
    }


    
})



// export const config = () => ({
//     port: Number(process.env.PORT),

//     database: {
//         uri: ''
//         MongooseModule.forRoot('mongodb://localhost/repair-factory-kpgabbro', {
//             useNewUrlParser: true,
//             useFindAndModify: false,
//             useCreateIndex: true,

//     }
// })
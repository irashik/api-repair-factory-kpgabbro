

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    },
    host: parseInt('localhost'),
    
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
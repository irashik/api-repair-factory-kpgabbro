import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import session from 'express-session';

export const databaseProviders = [

//     MongooseModule.forRootAsync({

//         imports: [ConfigModule],
        
      

//         useFactory: async (configService: ConfigService) => ({

//             uri: configService.get('MONGODB_URI'),
//             useNewUrlParser: true,
//             useFindAndModify: false,
//             useCreateIndex: true,

//         }),
//         inject: [ConfigService],
//     })
 ]










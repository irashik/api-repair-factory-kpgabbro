import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseOptionsFactory } from "@nestjs/mongoose";


@Injectable()
export class DatabaseConfig implements MongooseOptionsFactory {

    constructor(private configService: ConfigService) {}

    createMongooseOptions() {

        
        return {
            uri: this.configService.get('MONGODB_URI'),
            dbName: this.configService.get('MONGODB_NAME'),
            useNewUrlParser: true,

            
        }

    }    

}
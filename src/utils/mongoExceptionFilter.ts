import { HttpStatus } from "@nestjs/common";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { MongoError } from "mongodb";



@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        switch (exception.code) {
            case 11000:
                const ctx = host.switchToHttp();
                const response = ctx.getResponse<Response>();
                response.statusCode = HttpStatus.FORBIDDEN;
                response
                    .json({
                        statusCode: HttpStatus.FORBIDDEN,
                        timestamp: new Date().toISOString(),
                        message: 'E11000 duplicate key error collection или какая-то ошибка' 
                    });
                
                

        }
    }
}
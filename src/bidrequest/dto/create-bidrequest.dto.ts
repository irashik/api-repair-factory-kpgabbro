import { IsNotEmpty, IsBoolean, IsDate, IsDateString } from 'class-validator';




export class CreateBidrequestDto {

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly author: string;

    @IsNotEmpty()
    //@IsDate()
    @IsDateString()
    readonly dateCreated: Date;

    readonly priority: string;  // срочно, планово, желательно

    readonly category: string;  // инструмент, расходники, запчасти, прочее

    readonly comment: string;

    readonly statusBid: string;


    //@IsDate()
    @IsDateString()
    readonly dateStatusBid: Date;


    readonly lastAuthor: string;

// отсюда их убрать  нет. тогда ругается сервис, что в схеме есть, а в dto нет. ..??
    
    
    


    

    // todo добавь энумератор к ... полям
    
    

        
    
}



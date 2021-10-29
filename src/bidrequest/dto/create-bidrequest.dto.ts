import { IsNotEmpty, IsBoolean, IsDate } from 'class-validator';




export class CreateBidrequestDto {

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly author: string;

    @IsNotEmpty()
    // @IsDate()
    readonly dateCreated: Date;

    readonly priority: string;  // срочно, планово, желательно

    readonly category: string;  // инструмент, расходники, запчасти, прочее

    readonly comment: string;

    readonly statusBid: string;



// отсюда их убрать  нет. тогда ругается сервис, что в схеме есть, а в dto нет. ..??
    
    readonly dateStatusBid: Date;
    
    readonly lastAuthor: string;
    

    // todo добавь энумератор к ... полям
    
    

        
    
}



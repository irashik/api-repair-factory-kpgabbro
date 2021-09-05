import { IsNotEmpty, IsBoolean, IsDate } from 'class-validator';




export class CreateBidrequestDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly author: string;

    @IsNotEmpty()
    // @IsDate()
    readonly date: Date;


// отсюда их убрать  нет. тогда ругается сервис, что в схеме есть, а в dto нет. ..??
    readonly performed: boolean;
    readonly performedDate: Date;
    readonly inwork: boolean;
    readonly inworkDate: Date;



    // todo добавь энумератор к этим полям
    readonly priority: string;  // срочно, планово, желательно
    readonly category: string;  // инструмент, расходники, запчасти, прочее

        
    
}



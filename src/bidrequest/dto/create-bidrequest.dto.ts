import { IsNotEmpty, IsBoolean, IsDate } from 'class-validator';




export class CreateBidrequestDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly author: string;

    @IsNotEmpty()
    @IsDate()
    readonly date: Date;



    readonly performed: boolean;
    readonly performedDate: Date;
    readonly inwork: boolean;
    readonly inworkDate: Date;

        
    
}



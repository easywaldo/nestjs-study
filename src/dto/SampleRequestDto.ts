import { IsEmail, IsNotEmpty, Min } from 'class-validator';
export class SampleRequestDto {

    @IsNotEmpty()
    private carName : String;
    @Min(1000)
    private salePrice : Number;

    constructor(catName: String, salePrice: Number) {
        this.carName = catName;
        this.salePrice = salePrice;
    }
}
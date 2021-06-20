import { IsEmail, IsNotEmpty, Min } from 'class-validator';
export class SampleRequestDto {
    @IsNotEmpty()
    private carName: string;
    @Min(1000)
    private salePrice: number;

    constructor(catName: string, salePrice: number) {
        this.carName = catName;
        this.salePrice = salePrice;
    }
}

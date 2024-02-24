import { IsArray, IsInt } from "class-validator";

class CreateBarcodeDto {
    @IsInt()
    nmID: number;

    @IsArray()
    items: string[];
}

export default CreateBarcodeDto;

import { IsInt } from "class-validator";
import ProductItemCreateDto from "./product-item-create.dto";
import { ApiProperty } from "@nestjs/swagger";

class ProductItemUpdateDto extends ProductItemCreateDto {
    @ApiProperty({
        example: 45,
    })
    @IsInt()
    id: number;
}

export default ProductItemUpdateDto;

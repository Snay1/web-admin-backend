import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

class ProductItemDeleteDto {
    @ApiProperty({
        example: 45,
    })
    @IsInt()
    id: number;
}

export default ProductItemDeleteDto;

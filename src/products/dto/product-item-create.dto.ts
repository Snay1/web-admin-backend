import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsArray, IsBoolean } from "class-validator";

class ProductItemCreateDto {
    @ApiProperty({
        example: "New product 22",
    })
    @IsString()
    title: string;

    @ApiProperty({
        example: "Cool product",
    })
    @IsString()
    description: string;

    @ApiProperty({
        example: 45,
    })
    @IsInt()
    price: number;

    @ApiProperty({
        example: 15,
    })
    @IsInt()
    discount: number;

    @ApiProperty({
        example: 0,
    })
    @IsInt()
    rating: number;

    @ApiProperty({
        example: [],
    })
    @IsArray()
    images: string[];

    @ApiProperty({
        example: false,
    })
    @IsBoolean()
    isEnded: boolean;

    @IsInt()
    collectionId: number;
}

export default ProductItemCreateDto;

import { IsBoolean, IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class GetSessionInfoDto {
    @ApiProperty()
    @IsString()
    id: number;

    @ApiProperty({
        example: "test@gmail.com",
    })
    @IsString()
    email: string;

    @IsInt()
    iat: number;

    @IsInt()
    exp: number;

    @IsBoolean()
    hasAccess: boolean;
}

export default GetSessionInfoDto;

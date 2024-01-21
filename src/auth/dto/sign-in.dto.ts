import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class SignUpDto {
    @ApiProperty({
        example: "test@gmail.com",
    })
    @IsString()
    email: string;

    @ApiProperty({
        example: "password123",
    })
    @IsString()
    password: string;
}

export default SignUpDto;

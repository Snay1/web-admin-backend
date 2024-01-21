import { IsString } from "class-validator";
class SignUpDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}

export default SignUpDto;

import { IsString } from "class-validator";

class UserCreateDto {
    @IsString()
    email: string;

    @IsString()
    hash: string;

    @IsString()
    salt: string;
}

export default UserCreateDto;

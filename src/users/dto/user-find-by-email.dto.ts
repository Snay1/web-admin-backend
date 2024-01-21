import { IsString } from "class-validator";

class UserFindByEmailDto {
    @IsString()
    email: string;
}

export default UserFindByEmailDto;

import { Controller, Get, Res } from "@nestjs/common";
import { ApiHeader } from "@nestjs/swagger";
import { UsersService } from "./users.service";

@ApiHeader({
    name: "Access-Control-Allow-Origin",
    description: "https://marketplace-helper.ru",
})
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("/active-accounts")
    getActiveUsers(@Res({ passthrough: true }) res) {
        console.log(res);
        return this.usersService.getActiveUsers();
    }
}

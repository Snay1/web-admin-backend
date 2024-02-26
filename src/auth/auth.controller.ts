import {
    Controller,
    Post,
    Get,
    HttpCode,
    HttpStatus,
    Body,
    Res,
    UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto, SignInDto, GetSessionInfoDto } from "./dto";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { Response } from "express";
import { CookieService } from "./cookie.service";
import { AuthGuard } from "./auth.guard";
import { SessionInfo } from "./session-info.decorator";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private cookieService: CookieService,
    ) {}

    @Post("sign-up")
    @ApiCreatedResponse()
    async signUp(
        @Body() dto: SignUpDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { accessToken } = await this.authService.signUp(dto);

        this.cookieService.setToken(res, accessToken);
    }

    @Post("sign-in")
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    async signIn(
        @Body() dto: SignInDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { accessToken } = await this.authService.signIn(dto);

        this.cookieService.setToken(res, accessToken);
    }

    @Post("sign-out")
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    signOut(@Res({ passthrough: true }) res: Response) {
        return this.cookieService.removeToken(res);
    }

    @Get("session")
    @ApiOkResponse({
        type: GetSessionInfoDto,
    })
    @UseGuards(AuthGuard)
    async getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
        const sessionInfo = await this.authService.getSessionInfo(session);
        return sessionInfo;
    }
}

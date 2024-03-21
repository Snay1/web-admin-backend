import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Session,
    Res,
} from "@nestjs/common";
import { KeysService } from "./keys.service";
import {
    CreateUpdateOzonKeysDto,
    CreateUpdateWbKeysDto,
    CreateUpdateAvitoKeysDto,
    CreateUpdateYandexMarketKeysDto,
} from "./dto";
import { AuthGuard } from "src/auth/auth.guard";
import { GetSessionInfoDto } from "src/auth/dto";
import { ApiHeader } from "@nestjs/swagger";

@ApiHeader({
    name: "Access-Control-Allow-Origin",
    description: "https://marketplace-helper.ru",
})
@Controller("keys")
export class KeysController {
    constructor(private readonly keysService: KeysService) {}

    @Get("/ozon")
    @UseGuards(AuthGuard)
    getOzonKeys(
        @Res({ passthrough: true }) res,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.keysService.getOzonKeys(sessionInfo);
    }

    @Post("/ozon")
    @UseGuards(AuthGuard)
    createUpdateOzonKeys(
        @Res({ passthrough: true }) res,
        @Body() dto: CreateUpdateOzonKeysDto,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.keysService.createUpdateOzonKeys(dto, sessionInfo);
    }

    @Get("/wildberries")
    @UseGuards(AuthGuard)
    getWbKeys(
        @Res({ passthrough: true }) res,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.keysService.getWbKeys(sessionInfo);
    }

    @Post("/wildberries")
    @UseGuards(AuthGuard)
    createUpdateWbKeys(
        @Res({ passthrough: true }) res,
        @Body() dto: CreateUpdateWbKeysDto,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.keysService.createUpdateWbKeys(dto, sessionInfo);
    }

    @Get("/avito")
    @UseGuards(AuthGuard)
    getAvitoKeys(
        @Res({ passthrough: true }) res,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.keysService.getAvitoKeys(sessionInfo);
    }

    @Post("/avito")
    @UseGuards(AuthGuard)
    createUpdateAvitoKeys(
        @Res({ passthrough: true }) res,
        @Body() dto: CreateUpdateAvitoKeysDto,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.keysService.createUpdateAvitoKeys(dto, sessionInfo);
    }

    @Get("/yandex-market")
    @UseGuards(AuthGuard)
    getYandexMarketKeys(
        @Res({ passthrough: true }) res,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.keysService.getYandexMarketKeys(sessionInfo);
    }

    @Post("/yandex-market")
    @UseGuards(AuthGuard)
    createUpdateYandexMarketKeys(
        @Res({ passthrough: true }) res,
        @Body() dto: CreateUpdateYandexMarketKeysDto,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.keysService.createUpdateYandexMarketKeys(dto, sessionInfo);
    }
}

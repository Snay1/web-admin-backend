import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Session,
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

@Controller("keys")
export class KeysController {
    constructor(private readonly keysService: KeysService) {}

    @Get("/ozon")
    @UseGuards(AuthGuard)
    getOzonKeys(@Session() sessionInfo: GetSessionInfoDto) {
        return this.keysService.getOzonKeys(sessionInfo);
    }

    @Post("/ozon")
    @UseGuards(AuthGuard)
    createUpdateOzonKeys(
        @Body() dto: CreateUpdateOzonKeysDto,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.keysService.createUpdateOzonKeys(dto, sessionInfo);
    }

    @Get("/wildberries")
    @UseGuards(AuthGuard)
    getWbKeys(@Session() sessionInfo: GetSessionInfoDto) {
        return this.keysService.getWbKeys(sessionInfo);
    }

    @Post("/wildberries")
    @UseGuards(AuthGuard)
    createUpdateWbKeys(
        @Body() dto: CreateUpdateWbKeysDto,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.keysService.createUpdateWbKeys(dto, sessionInfo);
    }

    @Get("/avito")
    @UseGuards(AuthGuard)
    getAvitoKeys(@Session() sessionInfo: GetSessionInfoDto) {
        return this.keysService.getAvitoKeys(sessionInfo);
    }

    @Post("/avito")
    @UseGuards(AuthGuard)
    createUpdateAvitoKeys(
        @Body() dto: CreateUpdateAvitoKeysDto,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.keysService.createUpdateAvitoKeys(dto, sessionInfo);
    }

    @Get("/yandex-market")
    @UseGuards(AuthGuard)
    getYandexMarketKeys(@Session() sessionInfo: GetSessionInfoDto) {
        return this.keysService.getYandexMarketKeys(sessionInfo);
    }

    @Post("/yandex-market")
    @UseGuards(AuthGuard)
    createUpdateYandexMarketKeys(
        @Body() dto: CreateUpdateYandexMarketKeysDto,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.keysService.createUpdateYandexMarketKeys(dto, sessionInfo);
    }
}

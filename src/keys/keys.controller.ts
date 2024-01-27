import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { KeysService } from "./keys.service";
import {
    CreateUpdateOzonKeysDto,
    CreateUpdateWbKeysDto,
    CreateUpdateAvitoKeysDto,
    CreateUpdateYandexMarketKeysDto,
} from "./dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("keys")
export class KeysController {
    constructor(private readonly keysService: KeysService) {}

    @Get("/ozon")
    @UseGuards(AuthGuard)
    getOzonKeys() {
        return this.keysService.getOzonKeys();
    }

    @Post("/ozon")
    @UseGuards(AuthGuard)
    createUpdateOzonKeys(@Body() dto: CreateUpdateOzonKeysDto) {
        return this.keysService.createUpdateOzonKeys(dto);
    }

    @Get("/wildberries")
    @UseGuards(AuthGuard)
    getWbKeys() {
        return this.keysService.getWbKeys();
    }

    @Post("/wildberries")
    @UseGuards(AuthGuard)
    createUpdateWbKeys(@Body() dto: CreateUpdateWbKeysDto) {
        return this.keysService.createUpdateWbKeys(dto);
    }

    @Get("/avito")
    @UseGuards(AuthGuard)
    getAvitoKeys() {
        return this.keysService.getAvitoKeys();
    }

    @Post("/avito")
    @UseGuards(AuthGuard)
    createUpdateAvitoKeys(@Body() dto: CreateUpdateAvitoKeysDto) {
        return this.keysService.createUpdateAvitoKeys(dto);
    }

    @Get("/yandex-market")
    @UseGuards(AuthGuard)
    getYandexMarketKeys() {
        return this.keysService.getYandexMarketKeys();
    }

    @Post("/yandex-market")
    @UseGuards(AuthGuard)
    createUpdateYandexMarketKeys(@Body() dto: CreateUpdateYandexMarketKeysDto) {
        return this.keysService.createUpdateYandexMarketKeys(dto);
    }
}

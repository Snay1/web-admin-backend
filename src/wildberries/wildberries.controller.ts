import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Res,
    Session,
    UseGuards,
} from "@nestjs/common";
import { WildberriesService } from "./wildberries.service";
import { CreateBarcodeDto } from "./dto";
import { AuthGuard } from "src/auth/auth.guard";
import { GetSessionInfoDto } from "src/auth/dto";
import { ApiHeader } from "@nestjs/swagger";

@ApiHeader({
    name: "Access-Control-Allow-Origin",
    description: "https://marketplace-helper.ru",
})
@Controller("wildberries")
export class WildberriesController {
    constructor(private readonly wildberriesService: WildberriesService) {}

    @Get("/imtID/:id")
    fetchById(@Param() { id }: { id: number }) {
        return this.wildberriesService.fetchById(id);
    }

    @Get("/barcodes")
    @UseGuards(AuthGuard)
    getBarcodes(
        @Res({ passthrough: true }) res,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.wildberriesService.getBarcodes(sessionInfo);
    }

    @Post("/barcodes/create-update")
    @UseGuards(AuthGuard)
    createBarcode(
        @Res({ passthrough: true }) res,
        @Body() dto: CreateBarcodeDto,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.wildberriesService.createUpdateBarcode(dto, sessionInfo);
    }

    @Delete("/barcodes/delete/:id")
    @UseGuards(AuthGuard)
    deleteBarcode(
        @Res({ passthrough: true }) res,
        @Param() { id }: { id: number },
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.wildberriesService.deleteBarcode(id, sessionInfo);
    }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from "@nestjs/common";
import { WildberriesService } from "./wildberries.service";
import { CreateBarcodeDto } from "./dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("wildberries")
export class WildberriesController {
    constructor(private readonly wildberriesService: WildberriesService) {}

    @Get("/imtID/:id")
    fetchById(@Param() { id }: { id: number }) {
        return this.wildberriesService.fetchById(id);
    }

    @Get("/barcodes")
    @UseGuards(AuthGuard)
    getBarcodes() {
        return this.wildberriesService.getBarcodes();
    }

    @Post("/barcodes/create-update")
    @UseGuards(AuthGuard)
    createBarcode(@Body() dto: CreateBarcodeDto) {
        return this.wildberriesService.createUpdateBarcode(dto);
    }

    @Delete("/barcodes/delete/:id")
    @UseGuards(AuthGuard)
    deleteBarcode(@Param() { id }: { id: number }) {
        return this.wildberriesService.deleteBarcode(id);
    }
}

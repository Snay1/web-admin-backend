import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import {
    ProductItemCreateDto,
    ProductItemDeleteDto,
    ProductItemUpdateDto,
} from "./dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getAll() {
        return this.productsService.getAll();
    }

    @Get("/:id")
    async getOne(id: string) {
        return this.productsService.getOne(id);
    }

    @Post("/create")
    @UseGuards(AuthGuard)
    async create(@Body() dto: ProductItemCreateDto) {
        return this.productsService.create(dto);
    }

    @Put("/update")
    @UseGuards(AuthGuard)
    async update(@Body() dto: ProductItemUpdateDto) {
        return this.productsService.update(dto);
    }

    @Delete("/delete")
    @UseGuards(AuthGuard)
    async delete(@Body() dto: ProductItemDeleteDto) {
        return this.productsService.delete(dto);
    }
}

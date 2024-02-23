import { Controller, Get, Param } from "@nestjs/common";
import { WildberriesService } from "./wildberries.service";

@Controller("wildberries")
export class WildberriesController {
    constructor(private readonly wildberriesService: WildberriesService) {}

    @Get("/imtID/:id")
    fetchById(@Param() { id }: { id: number }) {
        return this.wildberriesService.fetchById(id);
    }
}

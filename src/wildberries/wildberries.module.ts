import { Module } from "@nestjs/common";
import { WildberriesService } from "./wildberries.service";
import { WildberriesController } from "./wildberries.controller";

@Module({
    controllers: [WildberriesController],
    providers: [WildberriesService],
})
export class WildberriesModule {}

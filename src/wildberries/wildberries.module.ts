import { Module } from "@nestjs/common";
import { WildberriesService } from "./wildberries.service";
import { WildberriesController } from "./wildberries.controller";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [WildberriesController],
    providers: [WildberriesService, PrismaService],
})
export class WildberriesModule {}

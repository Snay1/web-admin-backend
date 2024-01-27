import { Module } from "@nestjs/common";
import { KeysService } from "./keys.service";
import { KeysController } from "./keys.controller";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [KeysController],
    providers: [KeysService, PrismaService],
})
export class KeysModule {}

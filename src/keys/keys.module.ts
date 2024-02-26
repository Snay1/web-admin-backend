import { Module } from "@nestjs/common";
import { KeysService } from "./keys.service";
import { KeysController } from "./keys.controller";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "src/users/users.service";

@Module({
    controllers: [KeysController],
    providers: [KeysService, UsersService, PrismaService],
})
export class KeysModule {}

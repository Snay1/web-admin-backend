import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma.service";

@Module({
    // imports: [PrismaService],
    providers: [UsersService, PrismaService],
    exports: [UsersService],
})
export class UsersModule {}

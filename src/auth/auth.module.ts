import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PasswordService } from "./password.service";
import { CookieService } from "./cookie.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: "30d",
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PasswordService, CookieService, PrismaClient],
})
export class AuthModule {}

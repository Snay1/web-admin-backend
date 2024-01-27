import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { KeysModule } from "./keys/keys.module";

@Module({
    imports: [AuthModule, UsersModule, KeysModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

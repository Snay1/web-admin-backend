import {
    Controller,
    Get,
    Param,
    Post,
    Res,
    Session,
    UseGuards,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { AuthGuard } from "src/auth/auth.guard";
import { GetSessionInfoDto } from "src/auth/dto";

@Controller("payment")
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post("/pay")
    @UseGuards(AuthGuard)
    pay(
        @Res({ passthrough: true }) _,
        @Session() sessionInfo: GetSessionInfoDto,
    ) {
        return this.paymentService.pay(sessionInfo);
    }

    @Get("/pay/check/:id")
    payCheck(@Param() { id }: { id: string }) {
        return this.paymentService.payCheck(id);
    }
}

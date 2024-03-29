import { Injectable } from "@nestjs/common";
import { GetSessionInfoDto } from "src/auth/dto";
import axios from "axios";

@Injectable()
export class PaymentService {
    constructor() {}

    async pay(sessionInfo: GetSessionInfoDto) {
        const user = await sessionInfo;
        try {
            const res = await axios.post(
                "https://api.yookassa.ru/v3/payments",
                {
                    amount: {
                        value: "2.00",
                        currency: "RUB",
                    },
                    capture: true,
                    confirmation: {
                        type: "redirect",
                        return_url: "https://www.example.com/return_url",
                    },
                    description: `Покупка для пользователя ${user.email}`,
                },
                {
                    headers: {
                        "Idempotence-Key": `${user.email}${Date.now()}`,
                        "Content-Type": "application/json",
                        Authorization:
                            "Basic " +
                            btoa(
                                `${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_KEY}`,
                            ),
                    },
                },
            );

            console.log(res);

            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

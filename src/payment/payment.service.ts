import { BadRequestException, Injectable } from "@nestjs/common";
import { GetSessionInfoDto } from "src/auth/dto";
import axios from "axios";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PaymentService {
    constructor(private prismaService: PrismaService) {}

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

            if (!res || !res.data || res.status !== 200) {
                throw Error();
            }

            const newOrder = await this.prismaService.paymentOrder.create({
                data: {
                    orderId: res.data.id,
                    userEmail: user.email,
                },
            });

            return {
                success: true,
                message: "Платеж успешно создан",
                result: {
                    paymentResult: res.data,
                    orderInfo: newOrder,
                },
            };
        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: "Не удалось произвести оплату",
            });
        }
    }

    async payCheck(id: string) {
        try {
            const orderInfo = await this.prismaService.paymentOrder.findFirst({
                where: {
                    orderId: id,
                },
            });

            if (!orderInfo) {
                throw Error();
            }

            const res = await axios.get(
                `https://api.yookassa.ru/v3/payments/${id}`,
                {
                    headers: {
                        Authorization:
                            "Basic " +
                            btoa(
                                `${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_KEY}`,
                            ),
                    },
                },
            );

            if (!res || !res.data || res.status !== 200) {
                this.prismaService.paymentOrder.delete({
                    where: {
                        userEmail: orderInfo.userEmail,
                    },
                });
                throw Error();
            }

            const { status } = res.data;

            // if (status === "") {

            // }

            return res.data;
        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: "Не удалось получить данные об оплате",
            });
        }

        return id;
    }
}

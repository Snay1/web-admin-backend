import { BadRequestException, Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class WildberriesService {
    async fetchById(id: number) {
        try {
            const res = await axios.get(
                `https://card.wb.ru/cards/v1/detail?nm=${id}`,
            );

            if (!res.data) {
                throw new BadRequestException({
                    success: false,
                    message: "Cannot parse wb item",
                });
            }

            const item = res.data.data.products[0];

            const vol = Math.floor(item.id / 100_000);
            const part = Math.floor(item.id / 1_000);

            const basketHandler = () => {
                if (vol <= 143) {
                    return "01";
                }

                if (vol <= 287) {
                    return "02";
                }

                if (vol <= 431) {
                    return "03";
                }

                if (vol <= 719) {
                    return "04";
                }

                if (vol <= 1007) {
                    return "05";
                }

                if (vol <= 1061) {
                    return "06";
                }

                if (vol <= 1115) {
                    return "07";
                }

                if (vol <= 1169) {
                    return "08";
                }

                if (vol <= 1313) {
                    return "09";
                }

                if (vol <= 1601) {
                    return "10";
                }

                if (vol <= 1655) {
                    return "11";
                }

                if (vol <= 1919) {
                    return "12";
                }

                return "13";
            };

            const image = `https://basket-${basketHandler()}.wbbasket.ru/vol${vol}/part${part}/${
                item.id
            }/images/big/1.webp`;

            return {
                success: true,
                message: "Success!",
                result: {
                    ...item,
                    image,
                },
            };
        } catch (error) {
            return {
                result: null,
                success: false,
                message: "Cannot parse wb item",
            };
        }
    }
}

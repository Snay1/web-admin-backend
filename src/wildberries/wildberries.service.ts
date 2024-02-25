import { BadRequestException, Injectable } from "@nestjs/common";
import axios from "axios";
import { PrismaService } from "src/prisma.service";
import { CreateBarcodeDto } from "./dto";

@Injectable()
export class WildberriesService {
    constructor(private prismaService: PrismaService) {}

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

    async getBarcodes() {
        try {
            const barcodes = await this.prismaService.wbBarcodes.findMany();

            return {
                success: true,
                message: "Баркоды получены",
                result: barcodes,
            };
        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: "Не удалось получить баркоды",
                result: null,
            });
        }
    }
    async createUpdateBarcode({ nmID, items }: CreateBarcodeDto) {
        const barcodes = await this.prismaService.wbBarcodes.findMany();

        for (let i = 0; i < barcodes.length; i++) {
            const item = barcodes[i];

            if (item.nmID === nmID) {
                const updatedBarcode =
                    await this.prismaService.wbBarcodes.update({
                        where: {
                            id: item.id,
                        },
                        data: {
                            items,
                        },
                    });

                return {
                    success: true,
                    result: updatedBarcode,
                    message: "Баркоды обновлены",
                };
            }
        }

        const newBarcode = await this.prismaService.wbBarcodes.create({
            data: {
                nmID,
                items,
            },
        });

        return {
            success: true,
            result: newBarcode,
            message: "Баркоды созданы",
        };
    }
    async deleteBarcode(id: number) {
        try {
            const item = await this.prismaService.wbBarcodes.delete({
                where: {
                    nmID: Number(id),
                },
            });

            console.log(item);

            if (!item) {
                throw Error();
            }

            return {
                success: true,
                message: "Баркоды удалены",
                result: null,
            };
        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: "Не удалось удалить баркоды",
                result: null,
            });
        }
    }
}

import { Injectable } from "@nestjs/common";
import {
    ProductItemCreateDto,
    ProductItemDeleteDto,
    ProductItemUpdateDto,
} from "./dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    getAll() {
        return this.prisma.product.findMany();
    }

    getOne(id: string) {
        const numberId = Number(id);

        if (isNaN(numberId)) {
            throw Error("Не удалось найти продукт");
        }

        return this.prisma.product.findUnique({
            where: {
                id: numberId,
            },
        });
    }

    create(dto: ProductItemCreateDto) {
        return this.prisma.product.create({
            data: dto,
        });
    }

    update({ id, ...dto }: ProductItemUpdateDto) {
        return this.prisma.product.update({
            where: {
                id: id,
            },
            data: dto,
        });
    }

    delete(dto: ProductItemDeleteDto) {
        return this.prisma.product.delete({
            where: {
                id: dto.id,
            },
        });
    }
}

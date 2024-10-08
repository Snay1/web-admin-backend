import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserCreateDto, UserFindByEmailDto } from "./dto";

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    findByEmail({ email }: UserFindByEmailDto) {
        return this.prismaService.user.findFirst({ where: { email } });
    }

    create({ email, hash, salt }: UserCreateDto) {
        return this.prismaService.user.create({
            data: {
                email,
                hash,
                salt,
                hasAccess: false,
            },
        });
    }

    async getActiveUsers() {
        const activeUsers = await this.prismaService.user.count({
            where: {
                hasAccess: true,
            },
        });

        return {
            success: true,
            message: "Активные пользователи получены",
            result: activeUsers,
        };
    }
}

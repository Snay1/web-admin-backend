import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserCreateDto, UserFindByEmailDto } from "./dto";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    findByEmail({ email }: UserFindByEmailDto) {
        return this.prisma.user.findFirst({ where: { email } });
    }

    create({ email, hash, salt }: UserCreateDto) {
        return this.prisma.user.create({
            data: {
                email,
                hash,
                salt,
            },
        });
    }
}

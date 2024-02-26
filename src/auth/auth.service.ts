import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { GetSessionInfoDto, SignInDto, SignUpDto } from "./dto";
import { UsersService } from "src/users/users.service";
import { PasswordService } from "./password.service";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private passwordService: PasswordService,
        private jwtService: JwtService,
        private prismaService: PrismaClient,
    ) {}

    async signUp({ email, password }: SignUpDto) {
        const users = await this.prismaService.user.findMany();

        for (let i = 0; i < users.length; i++) {
            const user = users[i];

            if (user.email === email) {
                throw new BadRequestException({
                    success: false,
                    data: null,
                    message: "Пользователь с таким логином уже существует",
                });
            }
        }

        const salt = this.passwordService.getSalt();
        const hash = this.passwordService.getHash(password, salt);

        const newUser = await this.usersService.create({
            email,
            hash,
            salt,
        });

        const accessToken = await this.jwtService.signAsync({
            id: newUser.id,
            email: newUser.email,
        });

        return { accessToken };
    }

    async signIn({ email, password }: SignInDto) {
        const user = await this.usersService.findByEmail({ email });

        if (!user) {
            throw new UnauthorizedException();
        }

        const hash = this.passwordService.getHash(password, user.salt);

        if (user.hash !== hash) {
            throw new UnauthorizedException();
        }

        const accessToken = await this.jwtService.signAsync({
            id: user.id,
            email: user.email,
        });

        return { accessToken };
    }
    async getSessionInfo({ id, email, iat, exp }: GetSessionInfoDto) {
        const user = await this.usersService.findByEmail({ email });

        if (!user) {
            throw new BadRequestException();
        }

        return {
            id,
            iat,
            exp,
            email,
            hasAccess: user.hasAccess,
        };
    }
}

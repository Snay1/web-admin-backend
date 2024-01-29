import { BadRequestException, Injectable } from "@nestjs/common";
import {
    CreateUpdateOzonKeysDto,
    CreateUpdateWbKeysDto,
    CreateUpdateAvitoKeysDto,
    CreateUpdateYandexMarketKeysDto,
} from "./dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class KeysService {
    constructor(private prismaService: PrismaService) {}

    async getOzonKeys() {
        const keys = await this.prismaService.ozonKeys.findMany();

        if (!keys.length) {
            return {};
        }

        const { apiKey, clientId } = keys[0];

        return {
            apiKey,
            clientId,
        };
    }

    async createUpdateOzonKeys({ apiKey, clientId }: CreateUpdateOzonKeysDto) {
        const ozonKeys = await this.prismaService.ozonKeys.findMany();

        const validationHandler = () => {
            const errors = [];

            if (!apiKey && typeof apiKey !== "string") {
                errors.push("Ozon: ApiKey is required");
            }

            if (!clientId && typeof clientId !== "string") {
                errors.push("Ozon: ClientId is required");
            }

            return errors;
        };

        if (!ozonKeys.length) {
            const validationRes = validationHandler();

            if (validationRes.length) {
                throw new BadRequestException({
                    type: "error",
                    errors: validationRes,
                });
            }

            const result = await this.prismaService.ozonKeys.create({
                data: {
                    apiKey,
                    clientId,
                },
            });

            return {
                apiKey: result.apiKey,
                clientId: result.clientId,
            };
        }

        const validationRes = validationHandler();

        if (validationRes.length) {
            throw new BadRequestException({
                type: "error",
                errors: validationRes,
            });
        }

        const result = await this.prismaService.ozonKeys.update({
            where: {
                id: ozonKeys[0].id,
            },
            data: {
                apiKey,
                clientId,
            },
        });

        return {
            apiKey: result.apiKey,
            clientId: result.clientId,
        };
    }

    async getWbKeys() {
        const keys = await this.prismaService.wbKeys.findMany();

        if (!keys.length) {
            return {};
        }

        const { headerApiKey } = keys[0];

        return {
            headerApiKey,
        };
    }

    async createUpdateWbKeys({ headerApiKey }: CreateUpdateWbKeysDto) {
        const wbKeys = await this.prismaService.wbKeys.findMany();

        const validationHandler = () => {
            const errors = [];

            if (!headerApiKey && typeof headerApiKey !== "string") {
                errors.push("Wildberries: HeaderApiKey is required");
            }

            return errors;
        };

        if (!wbKeys.length) {
            const validationRes = validationHandler();

            if (validationRes.length) {
                throw new BadRequestException({
                    type: "error",
                    errors: validationRes,
                });
            }

            const result = await this.prismaService.wbKeys.create({
                data: {
                    headerApiKey,
                },
            });

            return {
                headerApiKey: result.headerApiKey,
            };
        }

        const validationRes = validationHandler();

        if (validationRes.length) {
            throw new BadRequestException({
                type: "error",
                errors: validationRes,
            });
        }

        const result = await this.prismaService.wbKeys.update({
            where: {
                id: wbKeys[0].id,
            },
            data: {
                headerApiKey,
            },
        });

        return {
            headerApiKey: result.headerApiKey,
        };
    }

    async getAvitoKeys() {
        const keys = await this.prismaService.avitoKeys.findMany();

        if (!keys.length) {
            return {};
        }

        const { client_id, client_secret } = keys[0];

        return {
            client_id,
            client_secret,
        };
    }

    async createUpdateAvitoKeys({
        client_id,
        client_secret,
    }: CreateUpdateAvitoKeysDto) {
        const avitoKeys = await this.prismaService.avitoKeys.findMany();

        const validationHandler = () => {
            const errors = [];

            if (!client_id && typeof client_id !== "string") {
                errors.push("Avito: client_id is required");
            }

            if (!client_secret && typeof client_secret !== "string") {
                errors.push("Avito: client_secret is required");
            }

            return errors;
        };

        if (!avitoKeys.length) {
            const validationRes = validationHandler();

            if (validationRes.length) {
                throw new BadRequestException({
                    type: "error",
                    errors: validationRes,
                });
            }

            const result = await this.prismaService.avitoKeys.create({
                data: {
                    client_id,
                    client_secret,
                },
            });

            return {
                client_id: result.client_id,
                client_secret: result.client_secret,
            };
        }

        const validationRes = validationHandler();

        if (validationRes.length) {
            throw new BadRequestException({
                type: "error",
                errors: validationRes,
            });
        }

        const result = await this.prismaService.avitoKeys.update({
            where: {
                id: avitoKeys[0].id,
            },
            data: {
                client_id,
                client_secret,
            },
        });

        return {
            client_id: result.client_id,
            client_secret: result.client_secret,
        };
    }

    async getYandexMarketKeys() {
        const keys = await this.prismaService.yandexMarketKeys.findMany();

        if (!keys.length) {
            return {};
        }

        const { client_id, client_secret } = keys[0];

        return {
            client_id,
            client_secret,
        };
    }

    async createUpdateYandexMarketKeys({
        client_id,
        client_secret,
    }: CreateUpdateYandexMarketKeysDto) {
        const yandexMarket =
            await this.prismaService.yandexMarketKeys.findMany();

        const validationHandler = () => {
            const errors = [];

            if (!client_id && typeof client_id !== "string") {
                errors.push("Yandex Market: client_id is required");
            }

            if (!client_secret && typeof client_secret !== "string") {
                errors.push("Yandex Market: client_secret is required");
            }

            return errors;
        };

        if (!yandexMarket.length) {
            const validationRes = validationHandler();

            if (validationRes.length) {
                throw new BadRequestException({
                    type: "error",
                    errors: validationRes,
                });
            }

            const result = await this.prismaService.yandexMarketKeys.create({
                data: {
                    client_id,
                    client_secret,
                },
            });

            return {
                client_id: result.client_id,
                client_secret: result.client_secret,
            };
        }

        const validationRes = validationHandler();

        if (validationRes.length) {
            throw new BadRequestException({
                type: "error",
                errors: validationRes,
            });
        }

        const result = await this.prismaService.yandexMarketKeys.update({
            where: {
                id: yandexMarket[0].id,
            },
            data: {
                client_id,
                client_secret,
            },
        });

        return {
            client_id: result.client_id,
            client_secret: result.client_secret,
        };
    }
}

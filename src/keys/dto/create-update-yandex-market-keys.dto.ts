import { IsString } from "class-validator";

class CreateUpdateYandexMarketKeys {
    @IsString()
    client_id: string;

    @IsString()
    client_secret: string;
}

export default CreateUpdateYandexMarketKeys;

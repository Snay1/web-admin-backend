import { IsString } from "class-validator";

class CreateUpdateOzonKeys {
    @IsString()
    apiKey: string;

    @IsString()
    clientId: string;
}

export default CreateUpdateOzonKeys;

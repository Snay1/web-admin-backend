import { IsString } from "class-validator";

class CreateUpdateAvitoKeys {
    @IsString()
    client_id: string;

    @IsString()
    client_secret: string;
}

export default CreateUpdateAvitoKeys;

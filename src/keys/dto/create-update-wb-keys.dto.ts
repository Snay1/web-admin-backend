import { IsString } from "class-validator";

class CreateUpdateWbKeys {
    @IsString()
    headerApiKey: string;
}

export default CreateUpdateWbKeys;

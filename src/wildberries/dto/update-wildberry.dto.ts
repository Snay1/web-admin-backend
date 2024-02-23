import { PartialType } from "@nestjs/swagger";
import { CreateWildberryDto } from "./create-wildberry.dto";

export class UpdateWildberryDto extends PartialType(CreateWildberryDto) {}

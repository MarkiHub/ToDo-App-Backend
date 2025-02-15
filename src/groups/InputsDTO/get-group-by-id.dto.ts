import { Transform, Type } from "class-transformer";
import { IsBoolean } from "class-validator";

export class GetGroupByIdDTO {
    @Transform(({value}) => value === 'true')
    @IsBoolean()
    members: boolean;

    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    tasks: boolean; 
}
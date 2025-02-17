import { Transform, Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class GetGroupByIdDTO {
    @Transform(({value}) => value === 'true')
    @IsBoolean()
    @IsOptional()
    members: boolean;

    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    @IsOptional()
    tasks: boolean; 
}
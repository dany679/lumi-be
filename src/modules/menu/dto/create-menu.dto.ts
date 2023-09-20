import { Type } from 'class-transformer';
import { IsArray, IsIn, IsMongoId, IsOptional } from 'class-validator';
const roles = ['DAY', 'NIGHT'] as const;
export type TimeRole = (typeof roles)[number];

export class CreateMenuDto {
  @IsArray()
  @IsOptional()
  @Type(() => IsMongoId)
  products: string[];
  @IsIn(roles)
  menuTime: TimeRole;
}

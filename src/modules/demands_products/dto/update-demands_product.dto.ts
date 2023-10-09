import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { CreateDemandsProductDto } from './create-demands_product.dto';

export class UpdateDemandsProductDto extends PartialType(
  CreateDemandsProductDto,
) {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsInt()
  id: number;
  @IsOptional()
  @IsBoolean()
  delete: boolean;
}

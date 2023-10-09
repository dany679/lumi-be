import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateDemandsProductDto {
  @IsNumber()
  @IsPositive()
  @IsInt()
  productId: number;
  @IsNumber()
  @IsPositive()
  @IsInt()
  demandId: number;
  @IsNumber()
  @IsPositive()
  @IsInt()
  total_plan: number;
  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsOptional()
  total_prod: number;
}

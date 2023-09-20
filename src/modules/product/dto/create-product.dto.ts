import {
  IsBase64,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsPositive()
  price: number;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  kg?: number;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsBase64()
  image: string;
  @IsOptional()
  @IsMongoId({ message: '_id categoryId valid!!' })
  categoryId?: string;
}

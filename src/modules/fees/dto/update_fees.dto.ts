import { PartialType } from '@nestjs/mapped-types';
import { CreateFees } from './create_fees.dto';

export class UpdateAccessPoints extends PartialType(CreateFees) {
  // @IsString()
  // @IsUUID()
  // @IsNotEmpty()
  // id: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessPoints } from './create-access_points.dto';

export class UpdateAccessPoints extends PartialType(CreateAccessPoints) {
  // @IsString()
  // @IsUUID()
  // @IsNotEmpty()
  // id: string;
}

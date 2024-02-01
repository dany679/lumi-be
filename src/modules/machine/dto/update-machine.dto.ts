import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateMachineDto } from './create-machine.dto';

export class UpdateProductDto extends PartialType(CreateMachineDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}

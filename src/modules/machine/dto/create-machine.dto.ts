import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMachineBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  type: string;
}
export class CreateMachineDto extends CreateMachineBodyDto {
  @IsUUID()
  userId: string;
}

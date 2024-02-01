import { IsIn, IsString, IsUUID } from 'class-validator';
const sensorIn = ['TcAg', 'TcAs', 'HF+'] as const;
export type sensorType = (typeof sensorIn)[number];

export class CreateAccessPoints {
  @IsString()
  name: string;

  @IsUUID()
  machineId: string;

  @IsString()
  sensorID: string;

  @IsIn(sensorIn)
  sensor: sensorType;
}

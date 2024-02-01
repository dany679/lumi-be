/* eslint-disable prettier/prettier */
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { IPagination, PaginationDTO } from './dto';

const sensorIn = ['TcAg', 'TcAs', 'HF+'] as const;
export type sensorType = (typeof sensorIn)[number];
export interface IPaginationSensor extends IPagination {
  name?: string;
  machineId?: string;
  sensorID?: string;
  sensor?: string;
}
export class idDTO {
  @IsPositive()
  @IsInt()
  id: number;
}
export class uuidDTO {
  @IsUUID()
  @IsString()
  id: string;
}

export class SensorPaginationDTO extends PaginationDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  machineId: string;

  @IsOptional()
  @IsString()
  sensorID: string;

  @IsOptional()
  @IsString()
  sensor: string;

  constructor(data: IPaginationSensor) {
    super(data);
    this.name = data.name || '';
    this.machineId = data.machineId || '';
    this.sensorID = data.sensorID || '';
    this.sensor = data.sensor || undefined;
  }
}

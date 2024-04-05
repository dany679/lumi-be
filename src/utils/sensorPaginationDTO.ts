/* eslint-disable prettier/prettier */
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { PaginationDTO } from './dto';

const states = [
  'AGUARDANDO',
  'EM ANDAMENTO',
  'PLANEJAMENTO',
  'CONCLUIDO',
] as const;
export type statesType = (typeof states)[number];
export interface IPaginationSensor extends PaginationDTO {
  name: string;
  machineId: string;
  serialID: string;
  state: string;
  userId: string;
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
  serialID: string;

  @IsOptional()
  @IsString()
  state: string;

  constructor(data: IPaginationSensor) {
    super(data);
    this.name = data.name || '';
    this.machineId = data.machineId || '';
    this.serialID = data.serialID || '';
    this.state = data.state || undefined;
  }
}
export type paginationSensorType = typeof SensorPaginationDTO;

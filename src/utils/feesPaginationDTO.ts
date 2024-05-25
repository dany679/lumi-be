/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';
import { PaginationDTO } from './dto';

export interface IPaginationFees extends PaginationDTO {
  userId: string;
  nClient: string;
  date: string | null;
}

export class FeesPaginationDTO extends PaginationDTO {
  @IsOptional()
  @IsString()
  nClient: string;

  @IsOptional()
  @IsString()
  date: string;

  @IsString()
  userId: string;

  constructor(data: IPaginationFees) {
    super(data);
    this.nClient = data.nClient || '';
    this.userId = data.userId || '';
    this.date = data.date || null;
  }
}
export type paginationFeesType = typeof FeesPaginationDTO;

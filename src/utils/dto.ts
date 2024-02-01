/* eslint-disable prettier/prettier */
import {
  IsInt,
  IsNumberString,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

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

export class PaginationDTO {
  @IsPositive()
  @IsInt()
  page: number;

  @IsPositive()
  @IsInt()
  @IsNumberString()
  limit: number;

  skip: number;
  count = 0;
  // prev: number | null;
  next: boolean;

  constructor(data: IPagination) {
    this.page = data.page ? convertToIntegerAbs(data.page) : 1;
    this.limit = data.limit ? convertToIntegerAbs(data.limit) : 20;
    this.skip = (this.page - 1) * this.limit;
  }
}
const convertToIntegerAbs = (string: string | number) => {
  const numberIs = Number(string);
  return numberIs > 1 ? numberIs : 1;
};
export interface IPagination {
  limit?: number;
  page?: number;
}

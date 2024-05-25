import {
  IsDate,
  IsNumber,
  IsNumberString,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateFeesBody {
  @IsString()
  @IsNumberString()
  nClient: string;
  @IsNumber()
  energiaEletricaWh: number;
  @IsNumber()
  energiaEletricaPrice: number;
  @IsNumber()
  energiaInjetadaWh: number;
  @IsNumber()
  energiaInjetadaPrice: number;
  @IsNumber()
  energiaCompensadaWh: number;
  @IsNumber()
  energiaCompensadaPrice: number;
  @IsNumber()
  contribPublic: number;
  @IsNumber()
  total: number;
  @IsDate()
  referenceDate: Date;
}

export class CreateFees extends CreateFeesBody {
  @IsUUID()
  userId: string;
}

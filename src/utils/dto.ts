import { IsMongoId } from 'class-validator';

export class idDTO {
  @IsMongoId({ message: '_id not valid!!' })
  id: string;
}

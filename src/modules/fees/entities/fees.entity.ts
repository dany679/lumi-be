import { Exclude } from 'class-transformer';
import { CreateFees } from '../dto/create_fees.dto';

export class FeesEntity extends CreateFees {
  id: string;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<FeesEntity>) {
    super();
    Object.assign(this, partial);
  }
}

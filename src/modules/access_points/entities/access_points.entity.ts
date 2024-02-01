import { Exclude } from 'class-transformer';
import { CreateAccessPoints } from '../dto/create-access_points.dto';

export class AccessPointsEntity extends CreateAccessPoints {
  id: string;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<AccessPointsEntity>) {
    super();
    Object.assign(this, partial);
  }
}

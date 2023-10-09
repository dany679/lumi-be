import { Exclude } from 'class-transformer';

export class ProductEntity {
  id: number;
  name: string;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}

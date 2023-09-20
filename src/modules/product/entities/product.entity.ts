import { Exclude } from 'class-transformer';

export class ProductEntity {
  id: string;
  name: string;
  price: number;
  kg: number;
  description: string;
  image: string;
  categoryId?: string;

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}

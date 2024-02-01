import { Exclude } from 'class-transformer';

export class MachineEntity {
  id: string;
  name: string;
  type: string;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<MachineEntity>) {
    Object.assign(this, partial);
  }
}

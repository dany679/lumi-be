import { PartialType } from '@nestjs/mapped-types';
import { IsIn } from 'class-validator';
import { CreateDemandDto } from './create-demand.dto';
const roles = ['EM ANDAMENTO', 'PLANEJAMENTO', 'CONCLUIDO'] as const;
export type TimeRole = (typeof roles)[number];
export class UpdateDemandDto extends PartialType(CreateDemandDto) {
  @IsIn(roles)
  status: TimeRole;
}

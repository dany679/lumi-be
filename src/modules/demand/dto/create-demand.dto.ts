import { IsDate, IsIn, IsOptional } from 'class-validator';
const roles = ['EM ANDAMENTO', 'PLANEJAMENTO', 'CONCLUIDO'] as const;
export type TimeRole = (typeof roles)[number];

export class CreateDemandDto {
  @IsDate()
  start_at: Date;
  @IsDate()
  finish_at: Date;
  @IsOptional()
  @IsIn(roles)
  status: TimeRole;
}

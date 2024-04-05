import { IsIn, IsString, IsUUID } from 'class-validator';
const states = [
  'AGUARDANDO',
  'EM ANDAMENTO',
  'PLANEJAMENTO',
  'CONCLUIDO',
] as const;
export type stateType = (typeof states)[number];

export class CreateAccessPointsBody {
  @IsString()
  name: string;

  @IsUUID()
  machineId: string;

  @IsString()
  serialID: string;

  @IsIn(states)
  state: stateType;
}

export class CreateAccessPoints extends CreateAccessPointsBody {
  @IsUUID()
  userId: string;
}

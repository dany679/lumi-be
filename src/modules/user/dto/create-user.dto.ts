import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
const providers = ['EMAIL', 'GITHUB'] as const;
export type Providers = (typeof providers)[number];
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  @IsIn(providers)
  provider: string;
}

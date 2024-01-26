import { IsEmail, IsIn, IsJWT, IsNotEmpty, IsString } from 'class-validator';
const providers = ['EMAIL', 'GITHUB'] as const;
export type Providers = (typeof providers)[number];
export class CreateUserAuthDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  hashedPassword: string;
  @IsString()
  @IsNotEmpty()
  @IsIn(providers)
  provider: string;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export type userToken = {
  id: string;
  email: string;
  provider: string;
};

export type userAuth = {
  id: string;
  email: string;
  provider: string;
  refreshToken: string;
};

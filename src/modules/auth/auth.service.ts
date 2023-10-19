import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthDto, userToken } from './dto/auth.dto';
// import { JwtService } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async bcryptHash(password: string) {
    return bcrypt.hash(password, 10);
  }
  async bcryptCompare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
  async signIn(loginUser: AuthDto): Promise<any> {
    const user = await this.userService.findByEmail(loginUser.email);
    // const user = await this.prismaService.user.findUnique({
    //   where: { email: loginUser.email },
    // });
    if (!user) {
      throw new UnauthorizedException(404, 'user not found ');
    }
    const compare = await this.bcryptCompare(
      loginUser.password,
      user.hashedPassword,
    );
    if (!compare) {
      throw new UnauthorizedException();
    }
    const { hashedPassword, ...result } = user;

    const payload = { email: user.email, id: user.id, provider: user.provider };
    const access_token = this.signInLocal(payload);

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return { result, access_token };
  }
  signInLocal({ id, provider, email }: userToken) {
    const access_token = this.jwtService.sign({
      sub: id,
      email,
      provider,
      claim: 'user',
    });
    return access_token;
  }
}

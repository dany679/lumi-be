import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserHttpStatus } from 'src/utils/erros/user.error';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    // private prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService, // private configService: ConfigService,
  ) {}
  async bcryptHash(password: string) {
    return bcrypt.hash(password, 10);
  }
  async bcryptCompare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const { password, ...user } = createUserDto;
    const userExists = await this.userService.findByEmail(createUserDto.email);
    if (userExists) {
      throw new HttpException(
        UserHttpStatus.CONFLICT_ALREADY_EXIST,
        HttpStatus.CONFLICT,
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({
      ...user,
      hashedPassword,
    });
    // if (!newUser) {
    //   throw new BadRequestException('Error creating user');
    // }
    const tokens = await this.getTokens(newUser.id, newUser.name);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return { tokens, user: newUser };
  }
  async signIn(loginUser: AuthDto): Promise<any> {
    // Check if user exists
    const user = await this.userService.findByEmail(loginUser.email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await this.bcryptCompare(
      loginUser.password,
      user.hashedPassword,
    );
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    const userAuth = { name: user.name, email: user.email, id: user.id };
    return { tokens, user: userAuth };
  }
  async logout(userId: string) {
    return this.userService.update(userId, { refreshToken: null });
  }
  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.bcryptHash(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: jwtConstants.access,
          // secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          // secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          secret: jwtConstants.refresh,

          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await this.bcryptCompare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches)
      throw new ForbiddenException('Access Denied token invalid');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}

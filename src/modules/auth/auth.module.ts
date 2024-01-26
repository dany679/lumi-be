// import { Module } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserModule } from '../user/user.module';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

// // import { JwtStrategy } from './strategy/jwt.strategy';

// @Module({
//   imports: [
//     UserModule,
//     // JwtModule.register({
//     //   global: true,
//     //   secret: jwtConstants.secret,
//     //   signOptions: { expiresIn: '60s' },
//     // }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy, JwtService],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy.ts';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
// import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}

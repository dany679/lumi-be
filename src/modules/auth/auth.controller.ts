import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/utils/guard/accessToken.guard';
import { GetCurrentUser } from 'src/utils/guard/get-user.decorator';
import { RefreshTokenGuard } from 'src/utils/guard/refreshToken.guard';
import { Public } from '../../utils/decorator/public.decorator';
import { GetCurrentUserById } from '../../utils/guard/get-user-by-id.decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto, userAuth } from './dto/auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('signin')
  sign(@Body() createUserDto: AuthDto) {
    return this.authService.signIn(createUserDto);
  }
  @Public()
  @HttpCode(201)
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@GetCurrentUserById() id: number) {
    console.log(id);
    this.authService.logout(id);
  }
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@GetCurrentUser() user: userAuth) {
    return this.authService.refreshTokens(user.id, user.refreshToken);
  }
}

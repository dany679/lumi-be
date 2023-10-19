import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GetCurrentUserById } from './utils/guard/get-user-by-id.decorator';
import { JwtAuthGuard } from './utils/guard/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@GetCurrentUserById() id: number): string {
    console.log(id);
    return this.appService.getHello();
  }
}

import { Injectable } from '@nestjs/common';
import { Public } from './utils/decorator/public.decorator';

@Injectable()
export class AppService {
  @Public()
  getHello(): string {
    return 'Hello World! not-authenticated';
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! not-authenticated';
  }
  getHelloAuth(): string {
    return 'Hello World! authenticated';
  }
}

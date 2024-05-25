import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { FeesModule } from './modules/fees/fees.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [FeesModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

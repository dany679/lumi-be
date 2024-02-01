import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccessPointsModule } from './modules/access_points/access_points.module';
import { AuthModule } from './modules/auth/auth.module';
import { MachineModule } from './modules/machine/machine.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [MachineModule, AccessPointsModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

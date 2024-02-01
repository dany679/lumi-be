import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from 'src/database/prisma.service';
import { AccessPointsController } from './access_points.controller';
import { AccessPointsService } from './access_points.service';

@Module({
  controllers: [AccessPointsController],
  providers: [
    AccessPointsService,
    PrismaService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AccessPointsModule {}

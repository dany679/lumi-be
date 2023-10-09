import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from 'src/database/prisma.service';
import { DemandController } from './demand.controller';
import { DemandService } from './demand.service';

@Module({
  controllers: [DemandController],
  providers: [
    DemandService,
    PrismaService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class DemandModule {}

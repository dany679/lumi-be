import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from 'src/database/prisma.service';
import { FeesController } from './fees.controller';
import { FeesService } from './fees.service';

@Module({
  controllers: [FeesController],
  providers: [
    FeesService,
    PrismaService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class FeesModule {}

import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from 'src/database/prisma.service';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';

@Module({
  controllers: [MachineController],
  providers: [
    MachineService,
    PrismaService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class MachineModule {}

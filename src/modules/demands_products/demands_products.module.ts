import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DemandsProductsController } from './demands_products.controller';
import { DemandsProductsService } from './demands_products.service';

@Module({
  controllers: [DemandsProductsController],
  providers: [DemandsProductsService, PrismaService],
})
export class DemandsProductsModule {}

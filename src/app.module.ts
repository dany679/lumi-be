import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemandModule } from './modules/demand/demand.module';
import { DemandsProductsModule } from './modules/demands_products/demands_products.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [ProductModule, DemandModule, DemandsProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

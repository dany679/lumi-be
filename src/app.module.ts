import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { MenuModule } from './modules/menu/menu.module';

@Module({
  imports: [ProductModule, CategoryModule, MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductMongoModule } from '../../shared/modules/product-mongo.module';
import { CategoryMongoModule } from '../../shared/modules/category-mongo.module';
import { BrandMongoModule } from '../../shared/modules/brand-mongo.module';

@Module({
  imports: [ProductMongoModule, CategoryMongoModule, BrandMongoModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductMongoModule } from '../../shared/modules/product-mongo.module';
import { OrderMongoModule } from '../../shared/modules/order-mongo.module';

@Module({
  imports: [ProductMongoModule, OrderMongoModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, orderSchema } from "../../models/order/order.schema";
import { OrderRepository } from "../../models/order/order.repository";

@Module({
   imports: [MongooseModule.forFeature([{name: Order.name,schema: orderSchema}])],
   providers: [OrderRepository],
   exports: [OrderRepository]  
})
export class OrderMongoModule {}
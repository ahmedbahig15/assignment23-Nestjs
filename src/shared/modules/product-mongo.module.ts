import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, productSchema } from "../../models/product/product.schema";
import { ProductRepository } from "../../models/product/product.repository";

@Module({
   imports: [MongooseModule.forFeature([{name: Product.name,schema: productSchema}])],
   providers: [ProductRepository],
   exports: [ProductRepository]  
})
export class ProductMongoModule {}
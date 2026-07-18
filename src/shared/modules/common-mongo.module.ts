import { Module } from "@nestjs/common";
import { CategoryMongoModule } from "./category-mongo.module";
import { BrandMongoModule } from "./brand-mongo.module";
import { ProductMongoModule } from "./product-mongo.module";

@Module({
   imports: [CategoryMongoModule,BrandMongoModule,ProductMongoModule] 
})
export class CommonMongoModule {}
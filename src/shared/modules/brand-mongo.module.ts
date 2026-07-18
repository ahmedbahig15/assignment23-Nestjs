import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Brand, brandSchema } from "../../models/brand/brand.schema";
import { BrandRepository } from "../../models/brand/brand.repository";


@Module({
   imports: [MongooseModule.forFeature([{name: Brand.name,schema: brandSchema}])],
   providers: [BrandRepository],
   exports: [BrandRepository]  
})
export class BrandMongoModule {}
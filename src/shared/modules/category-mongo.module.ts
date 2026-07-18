import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, categorySchema } from "../../models/category/category.schema";
import { CategoryRepository } from "../../models/category/category.repository";

@Module({
   imports: [MongooseModule.forFeature([{name: Category.name,schema: categorySchema}])],
   providers: [CategoryRepository],
   exports: [CategoryRepository]  
})
export class CategoryMongoModule {}
import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category } from "../entities/category.entity";
import  slugify  from 'slugify';

@Injectable()
export class CategoryFactoryService {
   createCategory(createCategoryDto: CreateCategoryDto) {
    const newCategory = new Category();
    newCategory.name = createCategoryDto.name.toLowerCase();
    newCategory.slug = slugify(newCategory.name);
    newCategory.logo = createCategoryDto.logo;
    newCategory.folderId = createCategoryDto.folderId;
    return newCategory;
   }
   updateCategory() {} 
}
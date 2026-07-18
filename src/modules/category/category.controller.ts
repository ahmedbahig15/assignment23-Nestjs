import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFactoryService } from './factory/category.factory';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService, 
    private readonly categoryFactoryService:CategoryFactoryService
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    // 1. factory
   const category = this.categoryFactoryService.createCategory(createCategoryDto);
   // 2. service
   const createdCategory = await this.categoryService.create(category);
   // 3. send response
   return {message: "category created successfully", sucess: true, data: createdCategory}
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}

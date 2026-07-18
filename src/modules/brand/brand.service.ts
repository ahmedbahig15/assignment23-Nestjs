import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { BrandRepository } from '../../models/brand/brand.repository';
import { CategoryRepository } from '../../models/category/category.repository';

@Injectable()
export class BrandService {
  constructor(
  private readonly brandRepository: BrandRepository,
  private readonly categoryRepository: CategoryRepository
) {}
  async create(brand: Brand) {
   const brandExist = await this.brandRepository.getOne({name: brand.name});
   if(brandExist) throw new ConflictException('brand already exists!');
   const categories = await this.categoryRepository.getAll({_id:{$in:brand.categoryIds}});
   if(categories.length!=brand.categoryIds.length) {throw new NotFoundException('some categories not found')};
   return await this.brandRepository.create(brand);
  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}

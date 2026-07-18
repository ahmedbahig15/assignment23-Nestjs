import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from '../../models/product/product.repository';
import { CategoryRepository } from '../../models/category/category.repository';
import { categoryNotFound } from '../category/errors';
import { BrandRepository } from '../../models/brand/brand.repository';
import { brandNotFound } from '../brand/errors';
import slugify from 'slugify';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly brandRepository: BrandRepository
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productExist = await this.productRepository.getOne({
    name: createProductDto.name.toLowerCase().trim()
  });
     //2. if yes, update stack for business wise
    if(productExist) {
     const updatedProduct = await this.productRepository.updateOne({_id: productExist._id},
      {stock: { $inc: createProductDto.stock }});

      return updatedProduct;
    };
    //3. check category existence into DB
    const categoryExist = await this.categoryRepository.getOne({_id: createProductDto.categoryId});
    if(!categoryExist) {throw categoryNotFound};
    //4. check brand existence into DB
    const brandExist = await this.brandRepository.getOne({_id: createProductDto.brandId})
    if(!brandExist) {throw brandNotFound};
    //5. prepare data
    let preparedobj = {
    name: createProductDto.name.toLowerCase().trim(),
    slug: slugify(createProductDto.name),
    description: createProductDto.description,
    mainImage: createProductDto.mainImage,
    subImages: createProductDto.subImages,
    price: createProductDto.price,
    discount: createProductDto.discount,
    discountType: createProductDto.discountType,
    stock: createProductDto.stock,
    sizes: createProductDto.sizes,
    colors: createProductDto.colors,
    categoryId: new Types.ObjectId(createProductDto.categoryId),
    brandId: new Types.ObjectId(createProductDto.brandId)
  };
  return await this.productRepository.create(preparedobj);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

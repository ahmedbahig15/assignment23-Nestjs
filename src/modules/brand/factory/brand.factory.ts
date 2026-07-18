import { Injectable } from "@nestjs/common";
import { CreateBrandDto } from "../dto/create-brand.dto";
import { Brand } from "../entities/brand.entity";
import slugify from 'slugify'
import { Types } from "mongoose";

@Injectable()
export class BrandFactoryService {
   createBrand(createBrandDto: CreateBrandDto) {
     const newBrand = new Brand();
     newBrand.name = createBrandDto.name.toLowerCase();
     newBrand.slug = slugify(newBrand.name);
     newBrand.logo = createBrandDto.logo;
     newBrand.folderId = createBrandDto.folderId;
     newBrand.categoryIds = createBrandDto.categories.map((id)=> new Types.ObjectId(id));
     return newBrand;
   }
   updateBrand() {} 
}
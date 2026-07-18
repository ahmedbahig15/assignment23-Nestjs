import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../abstract.repository";
import { Brand, TBrand } from "./brand.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class BrandRepository extends AbstractRepository<TBrand> {
   constructor(@InjectModel(Brand.name) brandModel:Model<TBrand>) {
    super(brandModel);
   } 
}
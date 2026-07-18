import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../abstract.repository";
import { Product, TProduct } from "./product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductRepository extends AbstractRepository<TProduct> {
   constructor(@InjectModel(Product.name) ProductModel: Model<TProduct>) {
    super(ProductModel);
   } 
}

import { Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Category, TCategory } from "./category.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryRepository extends AbstractRepository<TCategory> {
    constructor(@InjectModel(Category.name) categoryModel:Model<TCategory>) {
       super(categoryModel); 
    }
}
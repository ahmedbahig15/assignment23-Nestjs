import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { DiscountEnum } from "../../common/enums/discount.enum";

export type TProduct = Product & Document;

@Schema({timestamps: true})
export class Product {
   @Prop({type: String, required: true, trim: true})
    name!: string;

    @Prop({type: String, required: true, trim: true})
    slug!: string;

    @Prop({ type: String, required: true, trim: true })
    description!: string;

    @Prop({ type: String, required: true, })
    mainImage!: string;

    @Prop({ type: [String] })
    subImages!: string[];

    @Prop({type: Number})
    price!: number;

    @Prop({type: Number})
    discount!: number;

    @Prop({ type: Number, default: function(this:Product) {
   if (this.discountType == 'fixedAmount') return this.price - this.discount;
   else if(this.discountType == 'percentage') {
   return this.price - (this.discount * this.price)/100;
   }
   return this.price;
} })
    finalPrice!: number;

    @Prop({type: String, enum:DiscountEnum})
    discountType!: DiscountEnum;

    @Prop({type:Number, min: 1})
    stock!: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    createdBy!: Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    updatedBy!: Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
    categoryId!: Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Brand'})
    brandId!: Types.ObjectId;

    @Prop({type: [String]})
    colors!: string[];

    @Prop({type: [String]})
    sizes!: string[];
}
export const productSchema = SchemaFactory.createForClass(Product);
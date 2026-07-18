import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

export type TBrand = Brand & Document;

@Schema({timestamps:true})
export class Brand {
   @Prop({type: String, required: true, trim: true})
    name!: string;
    @Prop({type: String, required: true, trim: true})
    slug!: string;
   
    @Prop({ type: String })
    logo!: string;
   
    @Prop({ type: String })
    folderId!: string;
    
    @Prop({ type: [{type:mongoose.Schema.Types.ObjectId, ref: 'Category'}] })
    categoryId!: Types.ObjectId[];
}
export const brandSchema = SchemaFactory.createForClass(Brand);
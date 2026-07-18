import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Address {
   _id!: Types.ObjectId;

   @Prop({type: String})
   userName!: string;

   @Prop({type: String})
   phoneNumber!: string;

   @Prop({type: String})
   street!: string;

   @Prop({type: String})
   city!: string;

   @Prop({type: String})
   country!: string;

   @Prop({type: String})
   details!: string;
}

export const addressSchema = SchemaFactory.createForClass(Address);
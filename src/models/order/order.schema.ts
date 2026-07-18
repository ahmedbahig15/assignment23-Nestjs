import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { PaymentMethodEnum } from "../../common/enums/payment-method.enum";
import { OrderStatusEnum } from "../../common/enums/order-status.enum";

export type TOrder = Order & Document;

@Schema()
export class OrderItem {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
    pId!:Types.ObjectId;

    @Prop({ type: String })
    pName!:string;

    @Prop({ type: Number })
    pPrice!:number;

    @Prop({ type: Number })
    pDiscount!:number;

    @Prop({ type: Number })
    pFinalPrice!:number;

    @Prop({ type: Number })
    quantity!:number;

    @Prop({ type: Number })
    subTotal!:number;
}

@Schema({ timestamps: true })
export class Order {
   _id!: Types.ObjectId;

   @Prop({ type: String, required: true })
   orderId!: string;

   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
   addressId!: Types.ObjectId;

   @Prop({type: String, enum: OrderStatusEnum})
   status!: OrderStatusEnum;

   @Prop({ type: String, enum: PaymentMethodEnum })
   paymentMethod!: PaymentMethodEnum;

   @Prop({type: String})
   invoiceLink!: string;

   @Prop({ type: [OrderItem] })
   orderItems!: OrderItem[];

   @Prop({ type: Number })
   subTotal!: number;

   @Prop({ type: Number })
   fees!: number;

   @Prop({ type: Number })
   total!: number
}

export const orderSchema = SchemaFactory.createForClass(Order);
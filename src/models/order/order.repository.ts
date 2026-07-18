import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Order, TOrder } from "./order.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OrderRepository extends AbstractRepository<TOrder> {
   constructor(@InjectModel(Order.name) private readonly orderModel: Model<TOrder>) {
    super(orderModel);
   } 
}
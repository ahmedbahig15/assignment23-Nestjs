import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductRepository } from '../../models/product/product.repository';
import { productNotFound } from '../product/errors';
import { quantityGreaterThanStock } from './errors';
import { OrderRepository } from '../../models/order/order.repository';
import { Types } from 'mongoose';
import { PaymentMethodEnum } from '../../common/enums/payment-method.enum';
import { OrderStatusEnum } from '../../common/enums/order-status.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService {
  constructor (
  private readonly productRepository: ProductRepository,
  private readonly orderRepository: OrderRepository,
  private readonly configService: ConfigService
) {}

  async create(createOrderDto: CreateOrderDto) {
    //1. product exist [case cart >> check products existence]
   const productExist = await this.productRepository.getOne({_id:createOrderDto.product});
   if(!productExist) {throw productNotFound};
    //2. check product stack
    if(createOrderDto.quantity > productExist.stock) { throw quantityGreaterThanStock};
    //3. prepared obj
    const preparedObj = {
      orderId: String(Math.floor(Math.random() * 10000 + 99999)),
      addressId: new Types.ObjectId(createOrderDto.address),
      orderItems: [{
      pId: productExist._id, 
      pName: productExist.name, 
      quantity: createOrderDto.quantity,
      pDiscount: productExist.discount,
      pFinalPrice: productExist.finalPrice,
      pPrice: productExist.price,
      subTotal: createOrderDto.quantity * productExist.finalPrice
    }],
    //4. create order into DB >> orderStatus == 'placed'
    paymentMethod: createOrderDto.paymentMethod,
    status: createOrderDto.paymentMethod == PaymentMethodEnum.COD 
    ? OrderStatusEnum.placed : OrderStatusEnum.pending,
    subTotal: productExist.finalPrice * createOrderDto.quantity,
    fees: createOrderDto.paymentMethod == PaymentMethodEnum.COD 
    ? (this.configService.get('COD_FEES') as number) : 0,
    total: productExist.finalPrice * createOrderDto.quantity + 
    (createOrderDto.paymentMethod == PaymentMethodEnum.COD 
    ? (this.configService.get('COD_FEES') as number) : 0)
    }
    if(createOrderDto.paymentMethod == PaymentMethodEnum.COD && preparedObj.total > 200000) {
      throw new BadRequestException('can not proceed thid order with COD');
    }
    //5. if paymentMethod == COD
   const createdOrder = await this.orderRepository.create(preparedObj);
   if(createOrderDto.paymentMethod==PaymentMethodEnum.COD) {return createdOrder};
   //6. if vise >> payment gateway integration
   const body = {
     merchantId: 'MID-48155-222',
     paymentType: 'credit',
     amount: String(preparedObj.total),
     currency: 'egp',
     order: createdOrder._id,
     type: 'one-time',
     allowedMethods: 'card,wallet',
     enable3DS: true,
     serverWebhook: 'http://localhost:3000/order/webhook/kashier',
     merchantRedirect: 'http://youtube.com',
     failureRedirect: false,
     description: 'pay for e-commerce app',
     interactionSource: 'E-COMMERCE',
     expireAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
     customer: { 
      reference: "CUST_" + Date.now(),
      name: "Ahmed Ali",
      email: "ahmedbahig15@gmail.com",
},
   };
    const res = await fetch('https://test-api.kashier.io/v3/payment/sessions', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'api-key': this.configService.get('kashier').apiKey,
        Authorization: this.configService.get('kashier').apiSecret
      },
      body: JSON.stringify(body)
    });
    return {createdOrder, kashierRes: await res.json()};
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

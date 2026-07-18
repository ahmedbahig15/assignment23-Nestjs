import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { PaymentMethodEnum } from "../../../common/enums/payment-method.enum";

export class CreateOrderDto {
   @IsMongoId()
   @IsNotEmpty() 
   address!: string;

   @IsString()
   @IsEnum(PaymentMethodEnum)
   paymentMethod!: PaymentMethodEnum;

   @IsMongoId()
   @IsNotEmpty()
   product!: string;

   @IsNumber()
   @IsPositive()
   @IsNotEmpty()
   quantity!: number; 
}

import { applyDecorators } from "@nestjs/common";
import { IsNotEmpty, IsString, MaxLength, MinLength, registerDecorator, 
ValidationArguments ,ValidationOptions } from "class-validator";
import { DiscountEnum } from "../enums/discount.enum";

export function IsName(min: number= 2, max: number= 20) {
   return applyDecorators(IsString(),IsNotEmpty(),MinLength(min),MaxLength(max)); 
}


export function IsValidDiscount(validationOptions?: ValidationOptions) {
   return function (object: any, propertyName: string) {
    registerDecorator({
       name: 'isValidDiscount',
       target: object.constructor,
       propertyName: propertyName,
       options: validationOptions,
       validator: {
        validate(value: any, args: ValidationArguments) {
           const obj = args.object as any;
           const { discountType, price } = obj;

           if(discountType === DiscountEnum.percentage) {
             return typeof value === 'number' && value >= 0 && value <= 100;
           }

           if(discountType === DiscountEnum.fixedAmount) {
            return typeof value === 'number' && value >= 0 && value <= price;
           }

           return true;
        },

        defaultMessage(args: ValidationArguments) {
            const obj = args.object as any;
            const { discountType, price, discount } = obj;

            if(discountType === DiscountEnum.percentage) {
                if(discount > 100)   
               return 'Discount amount cannot exceed 100 when type is percentage';
              return 'Discount amount must be a valid positive number'; 
            }

            if(discountType === DiscountEnum.fixedAmount) {
                if(discount > price) {
                   return "Discount amount cannot exceed price"; 
                }
               return 'Discount amount must be a valid positive number'; 
            }

            return 'Invalid discount amount';
        }
       } 
    })
   } 
}
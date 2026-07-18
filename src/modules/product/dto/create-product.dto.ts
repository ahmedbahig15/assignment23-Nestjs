import { ArrayMinSize, IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { IsName, IsValidDiscount } from "../../../common/dto/validation.dto";
import { DiscountEnum } from "../../../common/enums/discount.enum";
import { Transform } from "class-transformer";

export class CreateProductDto {
   @IsName()
   name!: string;

   @IsName(20,1000)
   description!: string;

   @IsNumber()
   @IsPositive()
   @Min(1)
   price!: number;

   @IsValidDiscount()
   discount!: number;

   @IsString()
   @IsEnum(DiscountEnum)
   @IsOptional()
   discountType!: DiscountEnum;

   @IsString()
   @IsNotEmpty()
   mainImage!: string;

   @IsArray()
   @IsString({ each: true })
   subImages!: string[];

   @IsNumber()
   @Transform(({value})=> value?? 1)
   stock!: number;

   @IsMongoId()
   categoryId!: string;

   @IsMongoId()
   brandId!: string;

   @IsArray()
   @IsString({ each: true })
   @IsOptional()
   @ArrayMinSize(0)
   colors!: string[];

   @IsArray()
   @IsString({ each: true })
   @IsOptional()
   @ArrayMinSize(0)
   sizes!: string[];
}

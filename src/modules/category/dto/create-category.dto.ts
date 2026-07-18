import { IsOptional, IsString, } from "class-validator";
import { IsName } from "../../../common/dto/validation.dto";

export class CreateCategoryDto {
  @IsName()
   name!: string;

   @IsString()
   @IsOptional()
   logo!: string;

   @IsString()
   @IsOptional()
   folderId!: string; 
}
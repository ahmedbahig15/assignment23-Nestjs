import { IsArray, IsMongoId, IsOptional, IsString } from "class-validator";
import { IsName } from "../../../common/dto/validation.dto";

export class CreateBrandDto {
   @IsName() 
   name!: string;

   @IsString()
   @IsOptional()
   logo!: string;

   @IsString()
   @IsOptional()
   folderId!: string;

   @IsArray()
   @IsMongoId({ each: true })
   categories!: string[]; 
}

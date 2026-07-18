import { Types } from "mongoose";

export class Brand {
   name!: string;
   slug!: string;
   logo!: string;
   folderId!: string;
   categoryIds!: Types.ObjectId[]; 
}

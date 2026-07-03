import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { S3Provider } from "./providers/s3.provider";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { isPublic } from "../../common/decorators/public.decorator";

@Controller('upload')
@isPublic()
export class FileUploadController {
   constructor(private readonly s3Provider:S3Provider) {}
   
   @Post('/image')
   @UseInterceptors(FileInterceptor('file'))
   async uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
   const url = await this.s3Provider.upload(file);
   return {success: true, data: {url}}
   }


//    @Post('/images')
//    @UseInterceptors(FilesInterceptor('file', 5))
//    async uploadMultiFile(@UploadedFiles() files: Express.Multer.File[]) {
//    const url = await this.s3Provider.upload(files);
//    return {success: true, data: {url}}
//    }
}
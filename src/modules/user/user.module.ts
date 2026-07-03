import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FileUploadModule } from '../../shared/file-upload/file-upload.module';

@Module({
  imports: [FileUploadModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

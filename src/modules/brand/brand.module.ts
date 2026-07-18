import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MailModule } from '../../shared/mail/mail.module';
import { BrandMongoModule } from '../../shared/modules/brand-mongo.module';
import { BrandFactoryService } from './factory/brand.factory';
import { CategoryMongoModule } from '../../shared/modules/category-mongo.module';

@Module({
  imports: [MailModule,BrandMongoModule,CategoryMongoModule],
  controllers: [BrandController],
  providers: [BrandService,BrandFactoryService],
})
export class BrandModule {}

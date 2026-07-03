import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userMongoModule } from '../../shared/modules/user-mongo.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailModule } from '../../shared/mail/mail.module';
import { PermissionRepository } from '../../models/permissions/permissions.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, permissionsSchema } from '../../models/permissions/permissions.schema';

@Module({
  imports: [userMongoModule,MongooseModule.forFeature([{name:Permission.name,schema:permissionsSchema}]),
  MailModule,
  JwtModule.registerAsync({
   inject: [ConfigService], 
  useFactory: (configService: ConfigService)=>({
    secret:configService.get('jwt').accessSecret,
    signOptions: { expiresIn: '1d' }
  })
})],

  controllers: [AuthController],
  providers: [AuthService, PermissionRepository],
})
export class AuthModule {}

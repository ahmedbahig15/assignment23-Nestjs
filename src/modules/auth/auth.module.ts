import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userMongoModule } from '../../shared/modules/user-mongo.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [userMongoModule,
  JwtModule.registerAsync({
   inject: [ConfigService], 
  useFactory: (configService: ConfigService)=>({
    secret:configService.get('jwt').accessSecret,
    signOptions: { expiresIn: '1d' }
  })
})],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

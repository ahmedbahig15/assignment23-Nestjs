import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../../common/decorators/user.decorators';
import { AuthGuard } from '../../common/guards/auth.guard';
import { isPublic } from '../../common/decorators/public.decorator';

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @isPublic()
    async register(@Body() registerDto:RegisterDto) {
     const createdCustomer = await this.authService.register(registerDto);
      return {message: "user created successfully", success: true, data: { createdCustomer }}; 
    }

    @Post('login')
    @isPublic()
    async login(@Body() loginDto:LoginDto) {
     const objResult = await this.authService.login(loginDto);
     return {message: "login successfully", success: true, data: { objResult }}; 
    }

    @Get('profile/me')
    async getProfile(@User() user: any) {
      const customer = await this.authService.getProfile(user.sub);
      return { message: 'user get successfully', success: true, data: customer }  
    }
}

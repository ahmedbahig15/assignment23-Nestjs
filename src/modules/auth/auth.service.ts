import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { CustomerRepository } from '../../models/customer/customer.repository';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';


@Injectable()
export class AuthService {
    constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService
    ) {}

    async register(registerDto:RegisterDto) {
        //1- check user exist
        const customerExist = await this.customerRepository.getOne({ email: registerDto.email });
       //2- if yes >> throw error
      if(customerExist) {throw new ConflictException("user already exists!")};
      return await this.customerRepository.create(registerDto);
    }

    async login(loginDto:LoginDto) {
        //1- check user exist
      const customer = await this.customerRepository.getOne({email: loginDto.email});
        //2- if no, throw error user not found
        if(!customer) {throw new NotFoundException("user not found")};
        //3- check password
        //4- if no, throw error
        //5- generate token
       const accessToken = this.jwtService.sign({sub:customer._id, role: customer['role']});
       const refreshToken = this.jwtService.sign({sub: customer._id, role: customer['role']},{expiresIn: '7d'});
       return { accessToken,refreshToken }
    }

    async getProfile(userId: Types.ObjectId) {
      return await this.customerRepository.getOne({ _id: userId }); 
    }
}
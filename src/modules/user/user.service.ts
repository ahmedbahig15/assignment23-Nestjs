import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { S3Provider } from '../../shared/file-upload/providers/s3.provider';

@Injectable()
export class UserService {
  constructor(private readonly s3Provider:S3Provider) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    // this.s3Provider.delete(`users/${id}`)
    return `This action removes a #${id} user`;
  }
}

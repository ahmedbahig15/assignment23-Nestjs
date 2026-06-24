import { Model } from 'mongoose';
import { IUser } from '../../common/interfaces/user.interface';
import { AbstractRepository } from '../abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './user.schema';

@Injectable()
export class UserRepository extends AbstractRepository<IUser> {
  constructor(@InjectModel(User.name) userModel: Model<IUser>) {
    super(userModel);
  }
}

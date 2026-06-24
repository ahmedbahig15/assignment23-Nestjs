import { InjectModel } from '@nestjs/mongoose';
import { IAdmin } from '../../common/interfaces/user.interface';
import { AbstractRepository } from '../abstract.repository';
import { Model } from 'mongoose';
import { Admin } from './admin.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminRepository extends AbstractRepository<IAdmin> {
  constructor(@InjectModel(Admin.name) adminModel: Model<IAdmin>) {
    super(adminModel);
  }
}

import { GenderEnum } from '../enums/gender.enum';

export interface IUser {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface IAdmin {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  isActive: boolean;
}

export interface ICustomer {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: GenderEnum;
  address: string;
}

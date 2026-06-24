import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { GenderEnum } from '../../common/enums/gender.enum';

@Schema({ timestamps: true, discriminatorKey: 'role' })
export class Customer {
  _id!: Types.ObjectId;
  userName!: string;
  email!: string;
  password!: string;
  phoneNumber!: string;

  @Prop({ type: String })
  address!: string;

  @Prop({ type: Number, enum: GenderEnum, default: GenderEnum.male })
  gender!: GenderEnum;
}

export const customerSchema = SchemaFactory.createForClass(Customer);

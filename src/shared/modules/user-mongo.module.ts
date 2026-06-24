import { Module } from "@nestjs/common";
import { UserRepository } from "../../models/user/user.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "../../models/user/user.schema";
import { Admin, adminSchema } from "../../models/admin/admin.schema";
import { Customer, customerSchema } from "../../models/customer/customer.schema";
import { CustomerRepository } from "../../models/customer/customer.repository";
import { AdminRepository } from "../../models/admin/admin.repository";

@Module({
   imports: [
    MongooseModule.forFeature([
    { name: User.name, schema: userSchema, 
    discriminators: [
    {name: Admin.name, schema: adminSchema},
    {name: Customer.name, schema: customerSchema}
  ],
}
  ]),
],
   controllers: [],
   providers: [UserRepository, CustomerRepository, AdminRepository],
   exports: [UserRepository, CustomerRepository, AdminRepository] 
})


export class userMongoModule {}
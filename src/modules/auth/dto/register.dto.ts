import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class RegisterDto {
   @IsString()
   @IsNotEmpty()
   userName!: string;
   
   @IsEmail()
   email!: string;

   @IsStrongPassword()
   @IsNotEmpty()
   password!: string;

   @IsPhoneNumber("EG")
   phoneNumber!: string;
}
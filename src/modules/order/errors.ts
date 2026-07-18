import { BadRequestException } from "@nestjs/common";

export const quantityGreaterThanStock = new BadRequestException('quantity is greater than the product stock')
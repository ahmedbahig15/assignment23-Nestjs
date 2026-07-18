import { NotFoundException } from "@nestjs/common";

export const productNotFound = new NotFoundException('product not found!') 
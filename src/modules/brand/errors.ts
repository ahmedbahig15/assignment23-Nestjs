import { NotFoundException } from "@nestjs/common";

export const brandNotFound = new NotFoundException('Brand Not Found!');
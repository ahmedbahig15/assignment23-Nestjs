import { NotFoundException } from "@nestjs/common";

export const categoryNotFound = new NotFoundException('Category Not Found!')
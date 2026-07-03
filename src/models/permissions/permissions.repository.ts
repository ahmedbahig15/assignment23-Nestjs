import { Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Permission, PermissionDocument } from "./permissions.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PermissionRepository extends AbstractRepository<PermissionDocument> {
    constructor(@InjectModel(Permission.name) permissionModel: Model<PermissionDocument>) {
       super(permissionModel); 
    }
}
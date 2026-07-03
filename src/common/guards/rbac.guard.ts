import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { PermissionRepository } from "../../models/permissions/permissions.repository";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RBACGuard implements CanActivate {
    constructor(
    private readonly permissionRepository:PermissionRepository,
    private readonly reflector:Reflector
) {}

   async canActivate(context: ExecutionContext): Promise<boolean>{
  const request = context.switchToHttp().getRequest()
  const action = this.reflector.get('action',context.getHandler());
  const userPermissions = await this.permissionRepository.getOne({userId:request.user.sub});
  if(!userPermissions?.permissions.includes(action)) {
    throw new UnauthorizedException(`you are not allowed to ${action}!`);
  }
  return true;
   } 
}
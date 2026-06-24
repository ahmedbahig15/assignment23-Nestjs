import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC } from "../decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
    private readonly jwtService:JwtService, 
    private readonly reflector:Reflector
) {}

   canActivate(context: ExecutionContext): boolean {
   const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC, [
    context.getHandler(),
    context.getClass()
]);
    if(isPublic) return true;  
   const request = context.switchToHttp().getRequest();
   const authorization = request.headers.authorization; // bearer token
   if(!authorization) {throw new UnauthorizedException("token is missing!")};
   const token = authorization.split(' ')[1];
   request.user = this.jwtService.verify(token);
    return true;
   }
}
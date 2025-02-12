import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { JWT_KEY } from "src/configs/jwt.config";
import { JwtUtil } from "src/utils/jwtUtil";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private readonly jwtUtil:JwtUtil) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const req: Request = context.switchToHttp().getRequest() ;
        const token = req.cookies?.auth_token ;

        if(!token)
            return false 
        
        try {
            return this.jwtUtil.verifyToken(token, JWT_KEY) ;
        } catch (error) {
            return false ;
        }
    }

}
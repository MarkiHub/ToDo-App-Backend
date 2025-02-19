import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { publicEndpoints } from "src/configs/endpoints.config";
import { JWT_KEY } from "src/configs/jwt.config";
import { User } from "src/entities/user.entity";
import { JwtUtil } from "src/utils/jwtUtil";
import { Repository } from "typeorm";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly jwtUtil: JwtUtil,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const token = req.cookies?.auth_token;

        const isPublicRoute = publicEndpoints.some(route => 
            req.path.endsWith(route)
        );

        if(isPublicRoute) {
            return true;
        }

        if(!token) {
            throw new HttpException("Login required", HttpStatus.UNAUTHORIZED);
        }
        
        try {
            const isValid = this.jwtUtil.verifyToken(token, JWT_KEY);
            if(isValid) {
                const tokenData = this.jwtUtil.getTokenData(token, JWT_KEY);
                const user = await this.userRepository.findOne({ where: { name: tokenData.name }});
                
                if (!user) {
                    throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
                }

                (req as any).user = user;
                return true;
            }
            
            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
        } catch (error) {
            throw new HttpException(
                error.message || "Login required", 
                HttpStatus.UNAUTHORIZED
            );
        }
    }
}
import { Response } from "express";
import { JwtService } from "@nestjs/jwt"
import { Injectable } from "@nestjs/common";
import { JWT_KEY } from "./config";

@Injectable()
export class JwtUtil {

    constructor(private readonly jwtService: JwtService) {}

    signToken(res:Response, name:string) {

        const token = this.jwtService.
            sign({
                email: name
            },
                {
                    secret: JWT_KEY,
                    expiresIn: "1h"
                }
            );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        })
    }

    verifyToken(token:any, key:string) {
        return (this.getTokenData(token, key));
    }

    getTokenData(token:any, key:string) {
        return this.jwtService.verify(token, {secret: key}) ;
    }

}
import { ConfigService } from "@nestjs/config"

const configService = new ConfigService() ;

export const JWT_KEY = configService.get<string>("JWT_KEY") || "" ;
export const DB_HOST = configService.get<string>("DH_HOST") || "localhost" ;
export const DB_PORT = configService.get<string>("DB_PORT") || "3306" ;
export const DB_PASS = configService.get<string>("DB_PASS") || "" ;
export const DB_NAME = configService.get<string>("DB_NAME") || "" ;
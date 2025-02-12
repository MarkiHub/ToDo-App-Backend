import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dtos/auth/login.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import { Response } from 'express';
import { JwtUtil } from 'src/utils/jwtUtil';
import { JWT_KEY } from 'src/configs/jwt.config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly jwtUtil: JwtUtil
  ) {}

  @Post("register")
  async create(@Body() createUserDto: CreateUserDTO) {
    return await this.authService.registerUser(createUserDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.authService.findByNameAndPassword(loginDto) ;
    if(user) {
      this.jwtUtil.signToken(res, user.name) ;
      return res.json({ message: "Login exitoso", user });
    }
    return res.status(401).json({ message: "There's something wrong with your data" });
  }
}

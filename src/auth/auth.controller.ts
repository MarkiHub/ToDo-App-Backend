import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dtos/auth/login.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import { Response } from 'express';
import { JwtUtil } from 'src/utils/jwtUtil';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly jwtUtil: JwtUtil
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDTO) {
    return await this.authService.registerUser(createUserDto);
  }

  @Post()
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.authService.findByNameAndPassword(loginDto) ;
    if(user) 
      this.jwtUtil.signToken(res, user.name) ;
  }
}

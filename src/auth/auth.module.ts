import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { JwtUtil } from 'src/utils/jwtUtil';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from 'src/configs/jwt.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtUtil],
  imports: [UsersModule, 
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: '1h' }
    })],
})
export class AuthModule {}

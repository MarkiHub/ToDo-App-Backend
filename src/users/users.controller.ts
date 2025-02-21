import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, Req, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import { User } from 'src/entities/user.entity';
import { UpdateUserDTO } from 'src/dtos/users/update-user.dto';

@Controller('users')
export class UsersController {
    
    constructor(
        private userService: UsersService
    ){}


    @Post()
    async createUser(@Body() newUser: CreateUserDTO): Promise<User> {
        return await this.userService.createUser(newUser).then(user => {
            return user;
        }).catch(error => { throw error; });
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers().then(users => {
            return users;
        }).catch(error => { throw error; });
    } 

    @Get(':id')
    async getUserById(@Param("id", ParseIntPipe) id: number) {
        return await this.userService.getUserById(id).then(user => {
            return user;
        }).catch(error => { throw error; });
    }

    @Patch(':id')
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() user: UpdateUserDTO) {
        return await this.userService.updateUser(id, user).then(user => {
            return user;
        }).catch(error => { throw error; });
    }

    @Delete(':id')
    async deleteUser(@Param("id", ParseIntPipe) id: number) {
        return await this.userService.deleteUser(id).then(user => {
            return user;
        }).catch(error => { throw error; });
    }

    @Get('/profile/me')
    async getUserInfo(@Req() req: Request) {
        const user = (req as any).user; 
        try {
            if (!user) {
                throw new HttpException('Unauthorized', 401);
            }
            const userInfo = await this.userService.getUserById(user.id);
            return userInfo;
        } catch (error) {
            throw new HttpException('User not found', 404);
        }
    }
}

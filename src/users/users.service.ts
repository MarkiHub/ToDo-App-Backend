import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import { UpdateUserDTO } from 'src/dtos/users/update-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    async createUser(newUser: CreateUserDTO): Promise<User> {
        const user = this.userRepository.create(newUser);
        return await this.userRepository.save(user);
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: number) {
        return await this.userRepository.findOne(
            {where: {id}}
        );
    }

    async updateUser(id: number, user: UpdateUserDTO) {
        return await this.userRepository.update(id, user);
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete(id);
    }



}

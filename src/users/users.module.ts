import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Task } from 'src/entities/task.entity';
import { Group } from 'src/entities/group.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService], 
    controllers: [UsersController],
})

export class UsersModule {}

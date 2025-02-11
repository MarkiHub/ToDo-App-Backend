import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Task } from 'src/entities/task.entity';
import { Group } from 'src/entities/group.entity';

@Module({imports: [TypeOrmModule.forFeature([User])],})
export class UsersModule {}

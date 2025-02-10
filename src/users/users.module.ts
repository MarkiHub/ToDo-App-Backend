import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Task } from 'src/tasks/task.entity';
import { Group } from 'src/groups/group.entity';

@Module({imports: [TypeOrmModule.forFeature([User])],})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { User } from 'src/entities/user.entity';
import { Group } from 'src/entities/group.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Task,User,Group])], 
    providers: [TasksService], 
    controllers: [TasksController],
})

export class TasksModule {}

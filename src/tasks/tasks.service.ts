import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompleteTaskDTO } from 'src/dtos/tasks/complete-task.dto';
import { CreateTaskDTO } from 'src/dtos/tasks/create-task.dto';
import { UpdateTaskDTO } from 'src/dtos/tasks/update-task.dto';
import { Group } from 'src/entities/group.entity';
import { Status, Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Group) private groupRepository: Repository<Group>,

    ){}

    async createTask(taskDto: CreateTaskDTO): Promise<Task> {
        const userEntity = await this.userRepository.findOneBy({ id: taskDto.authorId });
    
        if (!userEntity) {
            throw new Error('User not found');
        }
    
        const groupEntity = taskDto.groupId ? await this.groupRepository.findOneBy({ id: taskDto.groupId }) : null;
    
        const task = this.taskRepository.create({...taskDto, author: userEntity, group: groupEntity || undefined, });
    
        return await this.taskRepository.save(task);
    }

    async getTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async getTaskById(id: number) {
        return await this.taskRepository.findOne(
            {where: {id}}
        );
    }

    async updateTask(id: number, taskDto: UpdateTaskDTO) {
        return await this.taskRepository.update(id, taskDto);
    }

    async deleteTask(id: number) {
        return await this.taskRepository.delete(id);
    }

    async completeTask(id: number, status: Status, taskDto: CompleteTaskDTO) {
        const doneBy = await this.userRepository.findOneBy({ id: taskDto.doneById });

        if (!doneBy) {
            throw new HttpException('User not found',  404);
        }

        const results = await this.taskRepository.update(id, {status: status, doneBy: doneBy});

        if (results.affected === 0) {
            throw new HttpException('Task not found', 404);
        } else if (results.affected === 1) {
            return {message: 'Task changed'};
        } else {
            throw new HttpException('An error occurred', 500);
        }
        
    }
}

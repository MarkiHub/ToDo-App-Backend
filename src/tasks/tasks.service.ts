import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from 'src/dtos/tasks/create-task.dto';
import { UpdateTaskDTO } from 'src/dtos/tasks/update-task.dto';
import { Group } from 'src/entities/group.entity';
import { Task } from 'src/entities/task.entity';
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
        const userEntity = await this.userRepository.findOneBy({id: taskDto.authorId});
        const groupEntity = await this.groupRepository.findOneBy({id: taskDto.groupId});
        if (!userEntity) {
            throw new Error('User not found');
        }

        if (!groupEntity) {
            throw new Error('Group not found');
        }

        const task = this.taskRepository.create({...taskDto, author: userEntity, group: groupEntity});
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

}

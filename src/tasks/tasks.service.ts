import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompleteTaskDTO } from 'src/dtos/tasks/complete-task.dto';
import { CreateTaskDTO } from 'src/dtos/tasks/create-task.dto';
import { FilterDTO } from 'src/dtos/tasks/filter-dto';
import { UpdateTaskDTO } from 'src/dtos/tasks/update-task.dto';
import { Group } from 'src/entities/group.entity';
import { Status, Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
  ) {}
  
   async createTask(taskDto: CreateTaskDTO, user: User): Promise<Task> {

    const groupEntity = taskDto.groupId
      ? await this.groupRepository.findOneBy({ id: taskDto.groupId })
      : null;

    const task = this.taskRepository.create({
      ...taskDto,
      author: user,
      group: groupEntity || undefined,
    });

    return await this.taskRepository.save(task);
  }

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getPersonalTasks(id: number): Promise<Task[]> {
    const userEntity = await this.userRepository.findOneBy({ id });

    if (!userEntity) {
      throw new HttpException('User not found', 404);
    }

    async getPersonalTasks(user:User): Promise<Task[]> {
        return await this.taskRepository.findBy({author: user, group: IsNull()});

    return await this.taskRepository.find({
      where: { author: userEntity, group: IsNull() },
    });
  }

  async getTaskById(id: number) {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async updateTask(id: number, taskDto: UpdateTaskDTO) {
    return await this.taskRepository.update(id, taskDto);
  }

  async deleteTask(id: number) {
    return await this.taskRepository.delete(id);
  }

  async completeTask(id: number, status: Status, taskDto: CompleteTaskDTO) {
    const doneBy = await this.userRepository.findOneBy({
      id: taskDto.doneById,
    });

    if (!doneBy) {
      throw new HttpException('User not found', 404);
    }

    const results = await this.taskRepository.update(id, {
      status: status,
      doneBy: doneBy,
    });

    if (results.affected === 0) {
      throw new HttpException('Task not found', 404);
    } else if (results.affected === 1) {
      return { message: 'Task changed' };
    } else {
      throw new HttpException('An error occurred', 500);
    }
  }

  async filterTasks(filter: FilterDTO) {
    console.log('filterTasks');
    console.log(filter);
    const author = filter.authorId
      ? await this.userRepository.findOneBy({ id: filter.authorId })
      : null;
    const group = filter.groupId
      ? await this.groupRepository.findOneBy({ id: filter.groupId })
      : null;
    const doneBy = filter.doneById
      ? await this.userRepository.findOneBy({ id: filter.doneById })
      : null;

    const query = this.taskRepository.createQueryBuilder('task');

    if (author) {
      query.andWhere('task.author = :author', { author: author.id });
    }

    if (group) {
      query.andWhere('task.group = :group', { group: group.id });
    } else {
        query.andWhere('task.group IS NULL');
    }

    if (doneBy) {
      query.andWhere('task.doneBy = :doneBy', { doneBy: doneBy.id });
    }

    if (filter.status) {
      query.andWhere('task.status = :status', { status: filter.status });
    }

    if (filter.location) {
      query.andWhere('task.location LIKE :location', {
        location: filter.location,
      });
    }

    if (filter.title) {
    query.andWhere('task.title LIKE :title', { title: `%${filter.title}%` });
    }
    console.log(query.getSql());
    return await query.getMany();
  }

async getGroupTasks(id:number) {
        const group = await this.groupRepository.findOneBy({id: id}) ;

        if(!group)
            throw new NotFoundException("There's no group with that id") ;
            
        return await this.taskRepository.findBy(group) ;
    }
}
